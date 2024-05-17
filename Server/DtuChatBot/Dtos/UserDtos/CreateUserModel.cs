namespace DtuChatBot.Dtos.UserDtos
{
    public class CreateUserModel
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }

        public int? Age { get; set; }

        public string? PhoneNumber { get; set; }

        public int? RoleId { get; set; }

        public string? PasswordHash { get; set; }
    }
}
