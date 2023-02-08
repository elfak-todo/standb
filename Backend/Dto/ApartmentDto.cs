using Microsoft.AspNetCore.Mvc;

namespace Backend.Dto;

public class ApartmentDto
{
    [FromForm(Name = "apartment")]
    public string Apartment { get; set; } = string.Empty;

    [FromForm(Name = "gallery")]
    public List<IFormFile>? Gallery { get; set; }
}