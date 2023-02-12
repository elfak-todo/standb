using Backend.Configuration;
using Backend.Dto;
using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Services;

public interface ICommnetService
{
    Task<ServiceResult<Comment>> Create(CommentDto commentDto, string apartmentId, string userId);

    Task<ServiceResult<bool>> Delete(string commentId, string userId);
}

public class CommentService : ICommnetService
{
    private readonly IMongoCollection<Apartment> _apartmentCollection;
    private readonly IMongoCollection<User> _userCollection;

    private readonly IOptions<DatabaseSettings> _dbSettings;

    public CommentService(IOptions<DatabaseSettings> dbSettings, IMongoDatabase mongoDb)
    {
        _dbSettings = dbSettings;
        _apartmentCollection
            = mongoDb.GetCollection<Apartment>(dbSettings.Value.ApartmentCollectionName);
        _userCollection
            = mongoDb.GetCollection<User>(dbSettings.Value.UserCollectionName);
    }

    public async Task<ServiceResult<Comment>> Create(CommentDto commentDto,
                            string apartmentId, string userId)
    {
        var apCursor = await _apartmentCollection.FindAsync(p => p.Id == apartmentId);
        var userCursor = await _userCollection.FindAsync(p => p.Id == userId);

        if (apCursor == null)
        {
            return new ServiceResult<Comment>
            {
                Result = null,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "ApartmentNotFound"
            };
        }

        if (userCursor == null)
        {
            return new ServiceResult<Comment>
            {
                Result = null,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "UserNotFound"
            };
        }

        var apartment = await apCursor.SingleAsync();
        var user = await userCursor.SingleAsync();

        var comment = new Comment()
        {
            Id = Guid.NewGuid().ToString(),
            Text = commentDto.Text,
            PublicationTime = DateTime.Now,
            Author = new Author()
            {
                Id = userId,
                FirstName = user.FirstName,
                LastName = user.LastName
            }
        };

        apartment.Comments.Add(comment);

        await _apartmentCollection.ReplaceOneAsync(
            Builders<Apartment>.Filter.Eq("_id", new ObjectId(apartmentId)),
            apartment,
            new ReplaceOptions { IsUpsert = false });

        return new ServiceResult<Comment>
        {
            Result = comment,
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<ServiceResult<bool>> Delete(string commentId, string userId)
    {
        var apCursor = await _apartmentCollection.FindAsync(p => p.Comments.Any(c => c.Id == commentId));

        var apartment = await apCursor.FirstOrDefaultAsync();

        if (apartment == null)
        {
            return new ServiceResult<bool>
            {
                Result = false,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "CommentNotFound"
            };
        }

        var comment = apartment.Comments.FirstOrDefault(c => c.Id == commentId)!;

        if (userId != comment.Author!.Id)
        {
            return new ServiceResult<bool>
            {
                Result = false,
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "Forbidden"
            };
        }

        apartment.Comments.Remove(comment);

        await _apartmentCollection.ReplaceOneAsync(
            Builders<Apartment>.Filter.Eq("_id", new ObjectId(apartment.Id)),
            apartment,
            new ReplaceOptions { IsUpsert = false });

        return new ServiceResult<bool>
        {
            Result = true,
            StatusCode = ServiceStatusCode.Success,
        };
    }
}