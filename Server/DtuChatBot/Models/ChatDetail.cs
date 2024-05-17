using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace DtuChatBot.Models;

public partial class ChatDetail
{
    public string Id { get; set; } = null!;

    public string? Question { get; set; }

    public string? Answer { get; set; }

    public long? CreatedTime { get; set; }

    public string ChatId { get; set; } = null!;

    [JsonIgnore]
    public virtual Chat Chat { get; set; } = null!;
}
