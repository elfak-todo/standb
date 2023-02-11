using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Backend.Models;

public class Comment
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = String.Empty;

    [BsonElement("title")]
    public string Title { get; set; } = String.Empty;

    [BsonElement("text")]
    public string Text { get; set; } = String.Empty;

    [BsonElement("publicationTime")]
    public DateTime PublicationTime { get; set; }

    [BsonElement("authorId")]
    public MongoDBRef? AuthorId { get; set; }
}