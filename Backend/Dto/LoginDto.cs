using Backend.Models;

namespace Backend.Dto;

public class LoginDto
{
    public User? user { get; set; }
    public string AccessToken { get; set; } = String.Empty;
}