using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Backend.Models;

public class Comment
{
    [BsonElement("id")]
    public string Id { get; set; } = String.Empty;

    [BsonElement("text")]
    public string Text { get; set; } = String.Empty;

    [BsonElement("publicationTime")]
    public DateTime PublicationTime { get; set; }

    [BsonElement("author")]
    public Author? Author { get; set; }
}