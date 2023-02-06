using System.Text;
using Backend.Configuration;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

//MongoDB
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("MongoDB"));

//Jwt
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));

//Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPasswordManager, PasswordManager>();
builder.Services.AddScoped<IJwtManager, JwtManager>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORS",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:8080",
                                              "http://localhost:7246",
                                              "http://localhost:3000",
                                              "https://localhost:8080",
                                              "http://127.0.0.1:8080",
                                              "https://127.0.0.1:8080",
                                              "https://127.0.0.1:5500",
                                              "http://127.0.0.1:5500",
                                              "http://127.0.0.1:5500",
                                              "http://localhost:5500",
                                              "https://localhost:5500",
                                              "http://192.168.1.35:3000",
                                              "http://192.168.100.2:3000")
                                              .AllowAnyHeader()
                                              .AllowAnyMethod()
                                              .AllowCredentials();
                      });

});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]!))
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CORS");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
