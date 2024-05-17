using DtuChatBot.Dtos.ChatDetailDtos;
using DtuChatBot.Dtos.ChatDtos;
using DtuChatBot.Models;
using DtuChatBot.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DtuChatBot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;
        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost("CreateChat")]
        public async Task<ActionResult<ServiceResponse<GetChatDto>>> CreateChat(CreateChatDto createChatDto)
        {
            return Ok(await _chatService.CreateChat(createChatDto));
        }

        [HttpGet("GetChatDetailsByChatId")]
        public async Task<ActionResult<ServiceResponse<List<GetChatDetailDto>>>> GetChatDetailsByChatId(string id)
        {
            return Ok(await _chatService.GetAllChatDetailsByChatId(id));
        }

        [HttpGet("GetChatsByAccountId")]
        public async Task<ActionResult<ServiceResponse<List<GetChatDto>>>> GetChatByAccountId(string id)
        {
            return Ok(await _chatService.GetAllChatsByAccountId(id));
        }

        [HttpPost("UpdateChatName")]
        public async Task<ActionResult<ServiceResponse<GetChatDto>>> UpdateChatName(UpdateChatNameDto request)
        {
            return Ok(await _chatService.UpdateChatName(request));
        }

        [HttpDelete("DeleteChatById")]
        public async Task<ActionResult<ServiceResponse<GetChatDto>>> DeleteChatById(string id)
        {
            return Ok(await _chatService.DeleteChat(id));
        }
    }
}
