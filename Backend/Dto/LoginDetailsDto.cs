using Backend.Models;

namespace Backend.Dto;

public class LoginDetailsDto
{
    public string Id { get; set; } = String.Empty;
    public string FirstName { get; set; } = String.Empty;
    public string LastName { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public bool IsAdmin { get; set; } = false;
    public string AccessToken { get; set; } = String.Empty;
}