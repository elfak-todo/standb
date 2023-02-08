
namespace Backend.Dto;

public class ApartmentDetails
{
    public string title { get; set; } = String.Empty;
    public int price { get; set; } = -1;
    public string category { get; set; } = String.Empty;
    public string location { get; set; } = String.Empty;
    public int squareFootage { get; set; } = -1;
    public int storey { get; set; } = -1;
    public int roomsCount { get; set; } = -1;
    public string heatingType { get; set; } = String.Empty;
    public bool isRegistered { get; set; } = false;
    public bool hasParking { get; set; } = false;
    public string description { get; set; } = String.Empty;
}