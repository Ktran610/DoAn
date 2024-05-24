namespace DtuChatBot.Dtos.ChatDetailDtos
{
    public class GetChatDetailStatus
    {
        public string Id { get; set; } = null!;

        public string? Question { get; set; }

        public string? Answer { get; set; }

        public string? Status { get; set; }

    }
}
