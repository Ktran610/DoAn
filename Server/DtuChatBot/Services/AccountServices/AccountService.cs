using AutoMapper;
using DtuChatBot.Dtos.UserDtos;
using DtuChatBot.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DtuChatBot.Services.AccountServices
{
    public class AccountService
    {
        private readonly IMapper _mapper;
        private readonly DtuchatbotContext _context;
        private readonly ChatService _chatService;
        public AccountService(IMapper mapper, DtuchatbotContext context, ChatService chatService) 
        {
            _mapper = mapper;
            _context = context;
            _chatService = chatService;
        }

        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> CreateAccount(CreateUserModel newAccount)
        {
            var response = new ServiceResponse<GetAccountDto>();
            try
            {
                var acc = _mapper.Map<Account>(newAccount);
                acc.RoleId = (int)RoleEnum.User;
                var checkAccount = await _context.Accounts.FirstOrDefaultAsync(a => a.UserName == acc.UserName);
                if (checkAccount != null)
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = "Đăng ký thất bại, tài khoản đã tồn tại";
                    return response;
                }
                var result = await _context.Accounts.AddAsync(acc);
                await _context.SaveChangesAsync();
                if (result != null)
                {
                    response.Data = _mapper.Map<GetAccountDto>(acc);
                    response.Success = true;
                    response.Message = "Đăng ký thành công, tiếp tục tới trang đăng nhập";
                }
                else
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = "Đăng ký thất bại, vui lòng thử lại";
                }
                return response;
            }
            catch(Exception ex)
            {
                response.Data = null;
                response.Success = false;
                response.Message = ex.Message;
                return response;
            }
        }

        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> CreateGuestUser()
        {
            var response = new ServiceResponse<GetAccountDto>();
            Random random = new Random();
            string randomName = "GuestUser" + random.Next(0, 1000).ToString();
            try
            {
                var acc = new Account() { Id = Guid.NewGuid().ToString(), RoleId = (int)RoleEnum.Guest, UserName = randomName, PasswordHash = "123123" };
                await _context.Accounts.AddAsync(acc);
                await _context.SaveChangesAsync();

                var result = _mapper.Map<GetAccountDto>(acc);
                if (result != null)
                {
                    response.Data = result;
                    response.Success = true;
                    response.Message = "Tiếp tục hỏi đáp với tư cách Khách!!!";
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

        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> Login(LoginUser request)
        {
            var response = new ServiceResponse<GetAccountDto>();
            try
            {
                //var acc = await _context.Accounts.FirstOrDefaultAsync(a => a.UserName == request.UserName && a.PasswordHash == request.PasswordHash);

                var acc = await _context.Accounts//.Include(a => a.Chats)//.ThenInclude(chat => chat.ChatDetails)
                    .FirstOrDefaultAsync(a => a.UserName == request.UserName && a.PasswordHash == request.PasswordHash);

                if (acc != null)
                {
                    response.Data = _mapper.Map<GetAccountDto>(acc);
                    response.Success = true;
                    response.Message = "Đăng nhập thành công!!!";
                }
                else
                {
                    response.Data = null;
                    response.Success = false;
                    response.Message = "Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại!!!";
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

        public async Task<ActionResult<ServiceResponse<GetAccountDto>>> UpdateAccount(UpdateUserDto request)
        {
            var response = new ServiceResponse<GetAccountDto>();
            try
            {
                var acc = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == request.Id);
                
                if (acc != null)
                {
                    acc.UserName = request.UserName;
                    acc.PasswordHash = request.PasswordHash;
                    acc.RoleId = request.RoleId;
                    acc.Age = request.Age;
                    acc.Email = request.Email;
                    acc.PhoneNumber = request.PhoneNumber;

                    await _context.SaveChangesAsync();
                    response.Data = _mapper.Map<GetAccountDto>(acc);
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

        public async Task<ActionResult<ServiceResponse<bool>>> DeleteAccount(string id)
        {
            var response = new ServiceResponse<bool>();
            try
            {
                var acc = await _context.Accounts.Include(a => a.Chats).FirstOrDefaultAsync(a => a.Id == id);

                if (acc != null)
                {
                    _context.Chats.RemoveRange(acc.Chats);
                    _context.Accounts.Remove(acc);
                    await _context.SaveChangesAsync();
                    response.Data = true;
                    response.Success = true;
                }
                else
                {
                    response.Data = false;
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

        public async Task<ActionResult<ServiceResponse<List<GetAccountDto>>>> GetAllUserAccount()
        {
            var response = new ServiceResponse<List<GetAccountDto>>();
            try
            {
                var accs = await _context.Accounts.Where(a => a.RoleId == (int)RoleEnum.Guest).Select(a => _mapper.Map<GetAccountDto>(a)).ToListAsync();

                if (accs != null)
                {
                    response.Data = accs;
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
    }
}
