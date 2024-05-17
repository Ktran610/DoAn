using AutoMapper;
using DtuChatBot.Dtos.ChatDetailDtos;
using DtuChatBot.Dtos.ChatDtos;
using DtuChatBot.Models;
using Microsoft.EntityFrameworkCore;

namespace DtuChatBot.Services
{
    public class ChatService
    {
        private readonly IMapper _mapper;
        private readonly DtuchatbotContext _context;

        public ChatService(IMapper mapper, DtuchatbotContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<ServiceResponse<GetChatDto>> CreateChat(CreateChatDto dto)
        {
            var response = new ServiceResponse<GetChatDto>();
            try
            {
                var chat = _mapper.Map<Chat>(dto);
                var result = await _context.Chats.AddAsync(chat);
                await _context.SaveChangesAsync();

                var data = _mapper.Map<GetChatDto>(chat);

                if (result != null)
                {
                    response.Data = data;
                    response.Success = true;
                }
                else
                {
                    response.Success = false;
                }
                
                return response;
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ServiceResponse<List<GetChatDetailDto>>> GetAllChatDetailsByChatId(string id)
        {
            var response = new ServiceResponse<List<GetChatDetailDto>>();
            try
            {
                var chatDetails = await _context.ChatDetails.Where(c => c.ChatId == id).OrderBy(c => c.CreatedTime).Select(c => _mapper.Map<GetChatDetailDto>(c)).ToListAsync();

                if (chatDetails != null)
                {
                    response.Data = chatDetails;
                    response.Success = true;
                }
                else
                {
                    response.Success = false;
                }

                return response;
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ServiceResponse<List<GetChatDto>>> GetAllChatsByAccountId(string id)
        {
            var response = new ServiceResponse<List<GetChatDto>>();
            try
            {
                var chats = await _context.Chats.Where(c => c.AccountId == id).OrderByDescending(c => c.CreatedTime).Select(c => _mapper.Map<GetChatDto>(c)).ToListAsync();

                if (chats != null)
                {
                    response.Data = chats;
                    response.Success = true;
                }
                else
                {
                    response.Data = null;
                    response.Success = false;
                }

                return response;
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ServiceResponse<GetChatDto>> UpdateChatName(UpdateChatNameDto request)
        {
            var response = new ServiceResponse<GetChatDto>();
            try
            {
                var chat = await _context.Chats.FirstOrDefaultAsync(c => c.Id == request.Id);

                if (chat != null)
                {
                    chat.Name = request.Name;
                    await _context.SaveChangesAsync();

                    response.Data = _mapper.Map<GetChatDto>(chat);
                    response.Success = true;
                }
                else
                {
                    response.Success = false;
                    response.Message = $"Chat with Id: {request.Id} not found";
                }

                return response;
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ServiceResponse<bool>> DeleteChat(string id)
        {
            var response = new ServiceResponse<bool>();
            try
            {
                var chat = await _context.Chats.FirstOrDefaultAsync(c => c.Id == id);

                if (chat != null)
                {
                    var x = _context.ChatDetails.Where(c => c.Id == chat.Id).ToList();
                    _context.ChatDetails.RemoveRange(_context.ChatDetails.Where(c => c.ChatId == chat.Id).ToList());
                    //await _context.SaveChangesAsync();
                    _context.Chats.Remove(chat);
                    await _context.SaveChangesAsync();

                    response.Data = true;
                    response.Success = true;
                }
                else
                {
                    response.Success = false;
                    response.Message = $"Chat with Id: {id} not found";
                }

                return response;
            }
            catch (Exception ex)
            {
                response.Data = false;
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }
    }
}
