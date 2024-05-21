using AutoMapper;
using DtuChatBot.Dtos.ChatDetailDtos;
using DtuChatBot.Dtos.ChatDtos;
using DtuChatBot.Dtos.UserDtos;
using DtuChatBot.Models;

namespace DtuChatBot
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            CreateMap<CreateUserModel, Account>()
                .ForMember(des => des.Id, source => source.MapFrom(src => Guid.NewGuid().ToString()));
            CreateMap<Account, GetAccountDto>()
                .ForMember(des => des.RoleName, source => source.MapFrom(src => (RoleEnum)src.RoleId));


            CreateMap<CreateChatDetailDto, ChatDetail>()
                .ForMember(des => des.Id, source => source.MapFrom(src => Guid.NewGuid().ToString()))
                .ForMember(des => des.CreatedTime, act => act.MapFrom(src => DateTime.UtcNow.Ticks));
            CreateMap<ChatDetail, GetChatDetailDto>();


            CreateMap<CreateChatDto, Chat>()
                .ForMember(des => des.Id, source => source.MapFrom(src => Guid.NewGuid().ToString()))
                .ForMember(des => des.CreatedTime, act => act.MapFrom(src => DateTime.UtcNow.Ticks));
            CreateMap<Chat, GetChatDto>();
            CreateMap<GetChatDto, Chat>();
        }
    }
}
