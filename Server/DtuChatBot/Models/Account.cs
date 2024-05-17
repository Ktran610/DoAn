using System;
using System.Collections.Generic;

namespace DtuChatBot.Models;

public partial class Account
{
    public string Id { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public int RoleId { get; set; }

    public string? PasswordHash { get; set; }

    public string? Email { get; set; }

    public int? Age { get; set; }

    public string? PhoneNumber { get; set; }

    public virtual ICollection<Chat> Chats { get; set; } = new List<Chat>();

    public virtual Role Role { get; set; } = null!;
}
