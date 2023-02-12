using Backend.Configuration;
using Backend.Dto;
using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Text.Json;

namespace Backend.Services;

public interface IUserService
{
    Task<ServiceResult<LoginDetailsDto>> Login(LoginCredsDto loginCreds);
    Task<ServiceResult<bool>> Register(RegisterDto regData);
    Task<ServiceResult<User>> Authenticate(string email, string password);
    Task<ServiceResult<Apartment>> AddToFavourites(string userID, string apartmentID);
    Task<ServiceResult<bool>> RemoveFromFavourites(string userID, string apartmnetID);
}

public class UserService : IUserService
{
    private readonly IMongoCollection<User> _userCollection;
    private readonly IMongoCollection<Apartment> _apartmentCollection;
    private readonly IPasswordManager _passwordManager;
    private readonly IJwtManager _jwtManager;

    public UserService(IOptions<DatabaseSettings> dbSettings,
            IPasswordManager passwordManager, IJwtManager jwtManager, IMongoDatabase mongoDb)
    {
        _userCollection = mongoDb.GetCollection<User>(dbSettings.Value.UserCollectionName);
        _passwordManager = passwordManager;
        _apartmentCollection
            = mongoDb.GetCollection<Apartment>(dbSettings.Value.ApartmentCollectionName);
        _jwtManager = jwtManager;
    }
    public async Task<ServiceResult<LoginDetailsDto>> Login(LoginCredsDto loginCreds)
    {
        var res = await Authenticate(loginCreds.Email, loginCreds.Password);

        if (res.Result == null)
            return new ServiceResult<LoginDetailsDto>
            {
                Result = null,
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = res.ErrorMessage
            };

        return new ServiceResult<LoginDetailsDto>
        {
            Result = new LoginDetailsDto()
            {
                Id = res.Result.Id,
                FirstName = res.Result.FirstName,
                LastName = res.Result.LastName,
                Email = res.Result.Email,
                IsAdmin = res.Result.IsAdmin,
                AccessToken = _jwtManager.Generate(res.Result)
            }
        };
    }

    public async Task<ServiceResult<bool>> Register(RegisterDto regData)
    {
        var u = await _userCollection.Find<User>(p => p.Email == regData.Email).FirstOrDefaultAsync();

        if (u != null)
            return new ServiceResult<bool>
            {
                StatusCode = ServiceStatusCode.AlreadyExists,
                ErrorMessage = "EmailAlreadyRegistered"
            };

        await _userCollection.InsertOneAsync(new User
        {
            FirstName = regData.FirstName,
            LastName = regData.LastName,
            Email = regData.Email,
            Password = _passwordManager.HashPassword(regData.Password),
            IsAdmin = false
        });

        return new ServiceResult<bool> { StatusCode = ServiceStatusCode.Success };
    }

    public async Task<ServiceResult<User>> Authenticate(string email, string password)
    {
        var user = await _userCollection.Find<User>(u => u.Email == email).FirstOrDefaultAsync();

        if (user == null)
            return new ServiceResult<User>
            {
                Result = null,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "UserNotFound"
            };

        if (!_passwordManager.VerifyPassword(password, user.Password))
            return new ServiceResult<User>
            {
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "InvalidPassword"
            };

        return new ServiceResult<User>
        {
            Result = new User
            {
                Id = user.Id!,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                IsAdmin = user.IsAdmin
            },
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<ServiceResult<Apartment>> AddToFavourites(string userID, string apartmentID)
    {
        var usCursor = await _userCollection.FindAsync(u => u.Id == userID);
        var apCursor = await _apartmentCollection.FindAsync(p => p.Id == apartmentID);
        var user = await usCursor.FirstOrDefaultAsync();
        var apartment = await apCursor.FirstOrDefaultAsync();

        if (user == null)
        {
            return new ServiceResult<Apartment>
            {
                Result = null,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "UserNotFound"
            };
        }

        if (apartment == null)
        {
            return new ServiceResult<Apartment>
            {
                Result = null,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "ApartmentNotFound"
            };
        }

        user.Favourites.Add(apartment.Id);

        await _userCollection.ReplaceOneAsync(
            Builders<User>.Filter.Eq("_id", new ObjectId(user.Id)),
            user,
            new ReplaceOptions { IsUpsert = false});

        return new ServiceResult<Apartment>
            {
                Result = apartment,
                StatusCode = ServiceStatusCode.Success
            };
    }

    public async Task<ServiceResult<bool>> RemoveFromFavourites(string userID, string apartmentID)
    {   
        var usCursor = await _userCollection.FindAsync(u => u.Id == userID);
        
        var user = await usCursor.FirstOrDefaultAsync();
        
        if (user == null)
        {
            return new ServiceResult<bool>
            {
                Result = false,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "UserNotFound"
            };
        }
        
        var apartment = user.Favourites.FirstOrDefault(f => f == apartmentID);
        
        if (apartment == null)
        {
            return new ServiceResult<bool>
            {
                Result = false,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "ApartmentNotFound"
            };
        }
        
        user.Favourites.Remove(apartment);
        
        await _userCollection.ReplaceOneAsync(
            Builders<User>.Filter.Eq("_id", new ObjectId(user.Id)),
            user,
            new ReplaceOptions { IsUpsert = false});
        
        return new ServiceResult<bool>
        {
            Result=true,
            StatusCode = ServiceStatusCode.Success
        };
    }
}

