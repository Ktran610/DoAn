﻿using DtuChatBot.Dtos.UserDtos;
using DtuChatBot.Models;
using DtuChatBot.Services.AccountServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DtuChatBot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> CreateAccount(CreateUserModel newAccount)
        {
            return Ok(await _accountService.CreateAccount(newAccount));
        }

        [HttpGet("GetAllUserAccount")]
        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> GetAllUserAccount()
        {
            return Ok(await _accountService.GetAllUserAccount());
        }

        [HttpPost("Login")]
        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> Login(LoginUser request)
        {
            return Ok(await _accountService.Login(request));
        }

        [HttpPost("LoginWithGuest")]
        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> LoginWithGuest()
        {
            return Ok(await _accountService.CreateGuestUser());
        }

        [HttpPost("UpdateAccount")]
        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> UpdateAccount(UpdateUserDto request)
        {
            return Ok(await _accountService.UpdateAccount(request));
        }

        [HttpDelete("DeleteAccount")]
        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> DeleteAccount(string id)
        {
            return Ok(await _accountService.DeleteAccount(id));
        }
    }
}