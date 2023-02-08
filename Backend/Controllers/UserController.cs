using Backend.Dto;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;


[ApiController]
[Authorize]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IJwtManager _jwtManager;
    public UserController(IUserService userService, IJwtManager jwtManager)
    {
        _userService = userService;
        _jwtManager = jwtManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var user = _jwtManager.GetUserDetails(HttpContext.User);
        Console.WriteLine(user?.Id);

        return Ok(await _userService.GetUsers());
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login(LoginCredsDto loginCreds)
    {
        var res = await _userService.Login(loginCreds);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [AllowAnonymous]
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register(RegisterDto regData)
    {
        var res = await _userService.Register(regData);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok();
    }
}