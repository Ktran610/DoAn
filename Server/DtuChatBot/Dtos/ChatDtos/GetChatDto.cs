using DtuChatBot.Models;

namespace DtuChatBot.Dtos.ChatDtos
{
    public class GetChatDto
    {
        public string Id { get; set; } = null!;

        public string? Name { get; set; }

        public string? AccountId { get; set; }

        public long? CreatedTime { get; set; }

    }
}
