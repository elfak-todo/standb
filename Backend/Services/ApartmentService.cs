using System.Text.Json;
using Backend.Configuration;
using Backend.Dto;
using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Backend.Services;

public interface IApartmentService
{
    Task<List<Apartment>?> GetAll();
    Task<ServiceResult<Apartment>> GetSingle(string id);
    Task<ServiceResult<Apartment>> Create(ApartmentDto apartmentData);
}
public class ApartmentService : IApartmentService
{
    private readonly IMongoCollection<Apartment> _apartmentCollection;
    private readonly IWebHostEnvironment _environment;
    public ApartmentService(IOptions<DatabaseSettings> databaseSettings, IWebHostEnvironment environment)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var mongoDb = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _apartmentCollection = mongoDb.GetCollection<Apartment>(databaseSettings.Value.ApartmentCollectionName);

        _environment = environment;
    }

    public async Task<List<Apartment>?> GetAll() => await _apartmentCollection.Find(_ => true).ToListAsync();

    public async Task<ServiceResult<Apartment>> GetSingle(string id)
    {
        var apartment = await _apartmentCollection.FindAsync(p => p.Id == id);

        if (apartment is null)
            return new ServiceResult<Apartment> { Result = null, StatusCode = ServiceStatusCode.NotFound, ErrorMessage = "ApartmentNotFound" };

        return new ServiceResult<Apartment> { Result = apartment.FirstOrDefault(), StatusCode = ServiceStatusCode.Success };
    }

    public async Task<ServiceResult<Apartment>> Create(ApartmentDto apartmentData)
    {
        var ap = JsonSerializer.Deserialize<ApartmentDetails>(apartmentData.Apartment);

        if (ap is null || apartmentData.Gallery is null)
            return new ServiceResult<Apartment> { StatusCode = ServiceStatusCode.Other, ErrorMessage = "FormDataInvalid" };

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
            string extension = Path.GetExtension(img.FileName);
            string fileName = Guid.NewGuid().ToString();
            string imagePath = Path.Combine(_environment.WebRootPath, fileName + extension);

            using (var stream = File.Create(imagePath))
            {
                await img.CopyToAsync(stream);
                apartment.Gallery.Add(fileName + extension);
            }
        }

        await _apartmentCollection.InsertOneAsync(apartment);

        return new ServiceResult<Apartment> { StatusCode = ServiceStatusCode.Success, Result = apartment };
    }
}