using Backend.Dto;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private readonly ICommnetService _commentService;
    private readonly IJwtManager _jwtManager;

    public CommentController(ICommnetService commnetService, IJwtManager jwtManager)
    {
        _commentService = commnetService;
        _jwtManager = jwtManager;
    }

    [HttpPost]
    [Route("{apartmentId}")]
    public async Task<IActionResult> Create([FromBody] CommentDto commentDto,
                                            string apartmentId)
    {
        var user = _jwtManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return Unauthorized("Bad credentials");
        }

        var res = await _commentService.Create(commentDto, apartmentId, user.Id);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }

    [HttpDelete]
    [Route("{commentId}")]
    public async Task<IActionResult> Delete(string commentId)
    {
        var user = _jwtManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return Unauthorized("Bad credentials");
        }

        var res = await _commentService.Delete(commentId, user.Id);

        if (res.StatusCode != ServiceStatusCode.Success)
            return BadRequest(res.ErrorMessage);

        return Ok(res.Result);
    }
}