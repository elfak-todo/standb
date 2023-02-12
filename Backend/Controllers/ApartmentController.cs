using Backend.Dto;
using Backend.Enums;
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
    private readonly IJwtManager _jwtManager;
    public ApartmentController(IApartmentService apartmentService, IJwtManager jwtManager)
    {
        _apartmentService = apartmentService;
        _jwtManager = jwtManager;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? q,
        [FromQuery] string? loc, [FromQuery] string? cat, [FromQuery] SortBy? sortBy)
    {
        return Ok(await _apartmentService.GetAll(q, loc, cat, sortBy));
    }


    [HttpGet]
    public async Task<IActionResult> GetFavourites(string userID)
    {
        var user = _jwtManager.GetUserDetails(HttpContext.User);
        if (user == null)
        {
            return BadRequest();
        }

        var res = _apartmentService.GetByID(user.Favourites);
        throw new NotImplementedException();
    }

    [AllowAnonymous]
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetSingle(string id)
    {
        var res = await _apartmentService.GetSingle(id);

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