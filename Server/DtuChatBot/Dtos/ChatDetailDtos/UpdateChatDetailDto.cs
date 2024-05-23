namespace DtuChatBot.Dtos.ChatDetailDtos
{
    public class UpdateChatDetailDto
    {
        public string Id { get; set; } = null!;
        public string? Question { get; set; }

        public string? Answer { get; set; }

        public string? Report { get; set; }
        public string ChatId { get; set; } = null!;

    }
}
