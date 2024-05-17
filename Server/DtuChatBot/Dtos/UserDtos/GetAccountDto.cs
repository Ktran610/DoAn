using DtuChatBot.Models;

namespace DtuChatBot.Dtos.UserDtos
{
    public class GetAccountDto
    {
        public string Id { get; set; } = null!;

        public string UserName { get; set; } = null!;
        public string? Email { get; set; }

        public int? Age { get; set; }

        public string? PhoneNumber { get; set; }

        public int RoleId { get; set; }


        public virtual ICollection<Chat> Chats { get; set; } = new List<Chat>();
    }
}
