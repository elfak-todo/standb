using Backend.Configuration;
using Backend.Dto;
using Backend.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Services;

public interface IJwtManager
{
    string Generate(User user);
    UserDetailsDto? GetUserDetails(ClaimsPrincipal user);
}

public class JwtManager : IJwtManager
{
    private readonly JwtSettings _jwtSettings;
    public JwtManager(IOptions<JwtSettings> jwtSettings)
    {
        _jwtSettings = jwtSettings.Value;
    }

    public string Generate(User user)
    {
        var claims = new Claim[] {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim("Id", user.Id),
            new Claim("userEmail", user.Email),
            new Claim("isAdmin", user.IsAdmin.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            _jwtSettings.Issuer,
            _jwtSettings.Audience,
            claims,
            null,
            DateTime.UtcNow.AddHours(1),
            signingCredentials
        );

        string tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

        return tokenValue;
    }

    public UserDetailsDto? GetUserDetails(ClaimsPrincipal user)
    {
        var id = user.Claims.FirstOrDefault(p => p.Type == "Id");
        var email = user.Claims.FirstOrDefault(p => p.Type == "userEmail");
        var isAdmin = user.Claims.FirstOrDefault(p => p.Type == "isAdmin");

        if (id is null || email is null || isAdmin is null)
            return null;

        return new UserDetailsDto()
        {
            Id = id.Value,
            Email = email.Value,
            IsAdmin = bool.Parse(isAdmin.Value)
        };
    }
}