using Backend.Configuration;
using Backend.Dto;
using Backend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Backend.Services;

public interface IApartmentService
{
    Task<ServiceResult<Apartment>> Create(ApartmentDto apartmentData);
}
public class ApartmentService : IApartmentService
{
    private readonly IMongoCollection<Apartment> _apartmentCollection;
    public ApartmentService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var mongoDb = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _apartmentCollection = mongoDb.GetCollection<Apartment>(databaseSettings.Value.ApartmentCollectionName);
    }

    public Task<ServiceResult<Apartment>> Create(ApartmentDto apartmentData)
    {
        throw new NotImplementedException();
    }
}