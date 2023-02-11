using System.Text.Json;
using Backend.Configuration;
using Backend.Dto;
using Backend.Enums;
using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Services;

public interface IApartmentService
{
    Task<List<Apartment>?> GetAll(string? query, string? location,
             string? category, SortBy? sortBy);
    Task<ServiceResult<Apartment>> GetSingle(string id);
    Task<ServiceResult<Apartment>> Create(ApartmentDto apartmentData);
    Task<ServiceResult<Apartment>> Update(string id, ApartmentDto apartmentData);
    Task<ServiceResult<bool>> Delete(string id);
}
public class ApartmentService : IApartmentService
{
    private readonly IMongoCollection<Apartment> _apartmentCollection;
    private readonly IImageService _imageService;
    public ApartmentService(IOptions<DatabaseSettings> dbSettings,
                            IImageService imageService, IMongoDatabase mongoDb)
    {
        _apartmentCollection
            = mongoDb.GetCollection<Apartment>(dbSettings.Value.ApartmentCollectionName);
        _imageService = imageService;
    }

    public async Task<List<Apartment>?> GetAll(string? query, string? location,
                string? category, SortBy? sortBy)
    {
        var result = _apartmentCollection.Find(ap =>
            (string.IsNullOrEmpty(query)
                || ap.Title.Contains(query, StringComparison.CurrentCultureIgnoreCase)
                || ap.Description.Contains(query, StringComparison.CurrentCultureIgnoreCase))
            && (string.IsNullOrEmpty(location) || location == ap.Location)
            && (string.IsNullOrEmpty(category) || category == ap.Category));

        if (sortBy == SortBy.PriceAscending)
        {
            result = result.SortBy(ap => ap.Price);
        }
        else if (sortBy == SortBy.PriceDescending)
        {
            result = result.SortByDescending(ap => ap.Price);
        }

        return await result.ToListAsync();
    }

    public async Task<ServiceResult<Apartment>> GetSingle(string id)
    {
        var apartment = await _apartmentCollection.FindAsync(p => p.Id == id);

        if (apartment is null)
            return new ServiceResult<Apartment>
            {
                Result = null,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "ApartmentNotFound"
            };

        return new ServiceResult<Apartment>
        {
            Result = apartment.FirstOrDefault(),
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<ServiceResult<Apartment>> Create(ApartmentDto apartmentData)
    {
        var ap = JsonSerializer.Deserialize<ApartmentDetails>(apartmentData.Apartment);

        if (ap is null || apartmentData.Gallery is null)
            return new ServiceResult<Apartment>
            {
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "FormDataInvalid"
            };

        Apartment apartment = new Apartment()
        {
            Title = ap.title,
            Price = ap.price,
            Category = ap.category,
            Location = ap.location,
            SquareFootage = ap.squareFootage,
            Storey = ap.storey,
            RoomsCount = ap.roomsCount,
            HeatingType = ap.heatingType,
            IsRegistered = ap.isRegistered,
            HasParking = ap.hasParking,
            Description = ap.description
        };

        foreach (IFormFile img in apartmentData.Gallery)
        {
            var imgName = await _imageService.SaveImage(img);
            if (imgName is not null)
                apartment.Gallery.Add(imgName);
        }

        await _apartmentCollection.InsertOneAsync(apartment);

        return new ServiceResult<Apartment>
        {
            StatusCode = ServiceStatusCode.Success,
            Result = apartment
        };
    }

    public async Task<ServiceResult<Apartment>> Update(string id, ApartmentDto apartmentData)
    {
        var apartment = await _apartmentCollection.Find(p => p.Id == id).FirstOrDefaultAsync();

        if (apartment is null)
            return new ServiceResult<Apartment>
            {
                Result = null,
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "ApartmentNotFound"
            };

        var ap = JsonSerializer.Deserialize<ApartmentDetails>(apartmentData.Apartment);

        if (ap is null)
            return new ServiceResult<Apartment>
            {
                Result = null,
                StatusCode = ServiceStatusCode.Other,
                ErrorMessage = "FormDataInvalid"
            };

        apartment.Title = ap.title;
        apartment.Price = ap.price;
        apartment.Category = ap.category;
        apartment.Location = ap.location;
        apartment.SquareFootage = ap.squareFootage;
        apartment.Storey = ap.storey;
        apartment.RoomsCount = ap.roomsCount;
        apartment.HeatingType = ap.heatingType;
        apartment.IsRegistered = ap.isRegistered;
        apartment.HasParking = ap.hasParking;
        apartment.Description = ap.description;

        if (apartmentData.Gallery is not null)
        {
            foreach (var imgName in apartment.Gallery)
                _imageService.DeleteImage(imgName);

            apartment.Gallery.Clear();

            foreach (IFormFile img in apartmentData.Gallery)
            {
                var imgName = await _imageService.SaveImage(img);
                if (imgName is not null)
                    apartment.Gallery.Add(imgName);
            }
        }

        await _apartmentCollection.ReplaceOneAsync(
            Builders<Apartment>.Filter.Eq("_id", new ObjectId(id)),
            apartment,
            new ReplaceOptions { IsUpsert = false });

        return new ServiceResult<Apartment>
        {
            Result = apartment,
            StatusCode = ServiceStatusCode.Success
        };
    }

    public async Task<ServiceResult<bool>> Delete(string id)
    {
        var apartment = await _apartmentCollection.Find(p => p.Id == id).FirstOrDefaultAsync();

        if (apartment is null)
            return new ServiceResult<bool>
            {
                StatusCode = ServiceStatusCode.NotFound,
                ErrorMessage = "ApartmentNotFound"
            };

        foreach (string imgName in apartment.Gallery)
            _imageService.DeleteImage(imgName);

        await _apartmentCollection.DeleteOneAsync(Builders<Apartment>.Filter.Eq("_id", new ObjectId(id)));

        return new ServiceResult<bool>
        {
            Result = true,
            StatusCode = ServiceStatusCode.Success,
        };
    }
}