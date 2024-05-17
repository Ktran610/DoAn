using System;
using System.Collections.Generic;

namespace DtuChatBot.Models;

public partial class ChatDetail
{
    public string Id { get; set; } = null!;

    public string? Question { get; set; }

    public string? Answer { get; set; }

    public long? CreatedTime { get; set; }

    public string ChatId { get; set; } = null!;

    public string? Report { get; set; }

    public virtual Chat Chat { get; set; } = null!;
}
