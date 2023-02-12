using Backend.Models;

namespace Backend.Dto;

public class ApartmentFavDto : Apartment
{
    public bool IsFavourite { get; set; } = false;
}