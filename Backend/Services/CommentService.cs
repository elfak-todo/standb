using Backend.Configuration;
using Backend.Dto;
using Backend.Models;
using Microsoft.Extensions.Options;
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

    public CommentService(IOptions<DatabaseSettings> dbSettings, IMongoDatabase mongoDb)
    {
        _apartmentCollection
            = mongoDb.GetCollection<Apartment>(dbSettings.Value.ApartmentCollectionName);
    }

    public Task<ServiceResult<Comment>> Create(CommentDto commentDto, string apartmentId,
                                                string userId)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResult<bool>> Delete(string commentId, string userId)
    {
        throw new NotImplementedException();
    }
}