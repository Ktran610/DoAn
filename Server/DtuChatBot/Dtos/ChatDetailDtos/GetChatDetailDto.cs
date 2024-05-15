namespace DtuChatBot.Dtos.ChatDetailDtos
{
    public class GetChatDetailDto
    {
        public string Id { get; set; } = null!;

        public string? Question { get; set; }

        public string? Answer { get; set; }

        public long? CreatedTime { get; set; }

        public string ChatId { get; set; } = null!;
    }
}
