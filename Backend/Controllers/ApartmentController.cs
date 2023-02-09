using Backend.Dto;
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
    public ApartmentController(IApartmentService apartmentService)
    {
        _apartmentService = apartmentService;
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _apartmentService.GetAll());
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
}