namespace Backend.Dto;

public class UserDetailsDto
{
    public string Id { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public bool IsAdmin { get; set; } = false;
}