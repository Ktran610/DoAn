using DtuChatBot.Dtos.ChatDetailDtos;
using DtuChatBot.Models;
using DtuChatBot.Services.ChatDetailService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DtuChatBot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatDetailController : ControllerBase
    {
        private readonly ChatDetailService _chatDetailService;

        public ChatDetailController(ChatDetailService chatDetailService)
        {
            _chatDetailService = chatDetailService;
        }

        [HttpPost("AddChatDetail")]
        public async Task<ActionResult<ServiceResponse<bool>>> AddChatDetail(CreateChatDetailDto request)
        {
            return Ok(await _chatDetailService.CreateChatDetail(request));
        }

        [HttpGet("getchatdetailbychatid")]
        public async Task<ActionResult<ServiceResponse<List<GetChatDetailDto>>>> GetChatDetailsByChatId(string id)
        {
            return Ok(await _chatDetailService.GetChatDetailsByChatId(id));
        }

        [HttpGet("getallchatdetails")]
        public async Task<ActionResult<ServiceResponse<List<GetChatDetailDto>>>> GetAllChatDetais()
        {
            return Ok(await _chatDetailService.GetAllChatDetails());
        }

        /*[HttpPost(Name = "FakeApi")]
        public async Task<ActionResult<string>> FakeApi(string fe)
        {
            return Ok(await _chatDetailService.FakeApi(fe));
        }*/
    }
}
