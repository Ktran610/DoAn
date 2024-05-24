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
            CreateMap<CreateAdminModel, Account>()
                .ForMember(des => des.Id, source => source.MapFrom(src => Guid.NewGuid().ToString()))
                .ForMember(des => des.RoleId, source => source.MapFrom(src => (int)RoleEnum.Admin));
            CreateMap<Account, GetAccountDto>()
                .ForMember(des => des.RoleName, source => source.MapFrom(src => (RoleEnum)src.RoleId));


            CreateMap<CreateChatDetailDto, ChatDetail>()
                .ForMember(des => des.Id, source => source.MapFrom(src => Guid.NewGuid().ToString()))
                .ForMember(des => des.CreatedTime, act => act.MapFrom(src => DateTime.UtcNow.Ticks));
            CreateMap<ChatDetail, GetChatDetailDto>();
            CreateMap<ChatDetail, GetChatDetailStatus>()
                .ForMember(des => des.Status, source => source.MapFrom(src => src.Report));


            CreateMap<CreateChatDto, Chat>()
                .ForMember(des => des.Id, source => source.MapFrom(src => Guid.NewGuid().ToString()))
                .ForMember(des => des.CreatedTime, act => act.MapFrom(src => DateTime.UtcNow.Ticks));
            CreateMap<Chat, GetChatDto>();
            CreateMap<GetChatDto, Chat>();
        }
    }
}
