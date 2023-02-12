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
        
    [HttpPost]
    [Route("favourites")]
    public async Task<IActionResult> AddToFavourites(string ad)
    {
        var user = _jwtManager.GetUserDetails(HttpContext.User);
        if (user == null)
        {
            return BadRequest();
        }
        var res = await _userService.AddToFavourites(user.Id, ad);
        return Ok(res.Result);
    }

    [HttpDelete]
    [Route("favourites")]
    public async Task<IActionResult> RemoveFromFavourites(string ad)
    {
        var user = _jwtManager.GetUserDetails(HttpContext.User);
        if (user == null)
        {
            return BadRequest();
        }

        var res = await _userService.RemoveFromFavourites(user.Id, ad);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);
        
        return Ok();
    }
}