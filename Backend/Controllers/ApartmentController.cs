using Backend.Dto;
using Backend.Enums;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class ApartmentController : ControllerBase
{
    private readonly IApartmentService _apartmentService;
    private readonly IUserService _userService;
    private readonly IJwtManager _jwtManager;
    public ApartmentController(IApartmentService apartmentService, IJwtManager jwtManager, IUserService userService)
    {
        _apartmentService = apartmentService;
        _jwtManager = jwtManager;
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? q,
        [FromQuery] string? loc, [FromQuery] string? cat, [FromQuery] SortBy? sortBy)
    {
        return Ok(await _apartmentService.GetAll(q, loc, cat, sortBy));
    }

    [HttpGet]
    [Route("favourites")]
    public async Task<IActionResult> GetFavourites()
    {
        var authUser = _jwtManager.GetUserDetails(HttpContext.User);

        if (authUser is null)
            return BadRequest("NotLoggedIn");

        User? user = await _userService.GetById(authUser.Id);

        if (user is null)
            return BadRequest("UserInvalid");

        return Ok(await _apartmentService.GetFavourites(user.Favourites));
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetSingle(string id)
    {
        var authUser = _jwtManager.GetUserDetails(HttpContext.User);

        List<string>? favs = null;

        if (authUser is not null)
        {
            User? user = await _userService.GetById(authUser.Id);
            favs = user != null ? user.Favourites : null;
        }

        var res = await _apartmentService.GetSingle(id, favs);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ApartmentDto apartmentData)
    {
        var res = await _apartmentService.Create(apartmentData);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> Update([FromForm] ApartmentDto apartmentData, string id)
    {
        var res = await _apartmentService.Update(id, apartmentData);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var res = await _apartmentService.Delete(id);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }
}