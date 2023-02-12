using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = String.Empty;

    [BsonElement("firstName")]
    public string FirstName { get; set; } = String.Empty;

    [BsonElement("lastName")]
    public string LastName { get; set; } = String.Empty;

    [BsonElement("email")]
    public string Email { get; set; } = String.Empty;

    [BsonElement("password")]
    public string Password { get; set; } = String.Empty;

    [BsonElement("isAdmin")]
    public bool IsAdmin { get; set; } = false;
    
    [BsonElement("favourites")]
    public List<string> Favourites { get; set; } = new List<string>();
}