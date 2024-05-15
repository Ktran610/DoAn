using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DtuChatBot.Models;

public partial class Chat
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string? AccountId { get; set; }

    public long? CreatedTime { get; set; }

    [NotMapped]
    public virtual Account? Account { get; set; }

    public virtual ICollection<ChatDetail> ChatDetails { get; set; } = new List<ChatDetail>();
}
