using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models;

public class Apartment
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = String.Empty;

    [BsonElement("title")]
    public string Title { get; set; } = String.Empty;

    [BsonElement("price")]
    public int Price { get; set; } = -1;

    [BsonElement("category")]
    public string Category { get; set; } = String.Empty;

    [BsonElement("location")]
    public string Location { get; set; } = String.Empty;

    [BsonElement("squareFootage")]
    public int SquareFootage { get; set; } = -1;

    [BsonElement("storey")]
    public int Storey { get; set; } = -1;

    [BsonElement("roomsCount")]
    public int RoomsCount { get; set; } = -1;

    [BsonElement("heatingType")]
    public string HeatingType { get; set; } = String.Empty;

    [BsonElement("isRegistered")]
    public bool IsRegistered { get; set; } = false;

    [BsonElement("hasParking")]
    public bool HasParking { get; set; } = false;

    [BsonElement("description")]
    public string Description { get; set; } = String.Empty;

    [BsonElement("gallery")]
    public List<string> Gallery { get; set; } = new List<string>();

    [BsonElement("comments")]
    public IList<Comment> Comments { get; set; } = new List<Comment>();
}