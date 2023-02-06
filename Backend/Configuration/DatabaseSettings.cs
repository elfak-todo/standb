namespace Backend.Configuration;

public class DatabaseSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string UserCollectionName { get; set; } = null!;
    public string ApartmentCollectionName { get; set; } = null!;
}