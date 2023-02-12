using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models;

public class Author
{
    [BsonElement("id")]
    public string Id { get; set; } = String.Empty;

    [BsonElement("firstName")]
    public string FirstName { get; set; } = String.Empty;

    [BsonElement("lastName")]
    public string LastName { get; set; } = String.Empty;
}