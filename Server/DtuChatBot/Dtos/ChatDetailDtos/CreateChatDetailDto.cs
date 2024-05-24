﻿namespace DtuChatBot.Dtos.ChatDetailDtos
{
    public class CreateChatDetailDto
    {
        public string? Question { get; set; }
        public string? Answer { get; set; }
        public string? Report { get; set; } = "1";
        public string ChatId { get; set; } = null!;
    }
}
