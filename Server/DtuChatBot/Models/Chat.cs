using System;
using System.Collections.Generic;

namespace DtuChatBot.Models;

public partial class Chat
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string? AccountId { get; set; }

    public long? CreatedTime { get; set; }

    public virtual Account? Account { get; set; }

    public virtual ICollection<ChatDetail> ChatDetails { get; set; } = new List<ChatDetail>();
}
