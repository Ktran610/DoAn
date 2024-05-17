using DtuChatBot.Models;

namespace DtuChatBot.Dtos.UserDtos
{
    public class GetAccountDto
    {
        public string Id { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public int RoleId { get; set; }


        public virtual ICollection<Chat> Chats { get; set; } = new List<Chat>();
    }
}
