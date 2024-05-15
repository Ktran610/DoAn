﻿using AutoMapper;
using DtuChatBot.Dtos.ChatDetailDtos;
using DtuChatBot.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;

namespace DtuChatBot.Services.ChatDetailService
{
    public class ChatDetailService
    {
        private readonly IMapper _mapper;
        private readonly DtuchatbotContext _context;

        public ChatDetailService(IMapper mapper, DtuchatbotContext context)
        {
            _mapper = mapper;
            _context = context;
        }


        public async Task<ServiceResponse<bool>> CreateChatDetail(CreateChatDetailDto dto)
        {
            var response = new ServiceResponse<bool>();
            try
            {
                var chatDetail = _mapper.Map<ChatDetail>(dto);
                var result = await _context.ChatDetails.AddAsync(chatDetail);
                await _context.SaveChangesAsync();
                if (result != null)
                {
                    response.Data = true;
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
                response.Data = false;
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ServiceResponse<List<GetChatDetailDto>>> GetChatDetailsByChatId(string chatId)
        {
            var response = new ServiceResponse<List<GetChatDetailDto>>();
            try
            {
                var chat = await _context.Chats.FirstOrDefaultAsync(c => c.Id == chatId);
                if (chat == null)
                {
                    response.Data = null;
                    response.Success = false;
                    return response;
                }
                var chatDetails = await _context.ChatDetails.Where(cd => cd.ChatId == chatId)
                    .Select(cd => _mapper.Map<GetChatDetailDto>(cd)).ToListAsync();
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
    }
}