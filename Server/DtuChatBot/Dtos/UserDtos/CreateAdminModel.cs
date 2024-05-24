namespace DtuChatBot.Dtos.UserDtos
{
    public class CreateAdminModel
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }

        public int? Age { get; set; }

        public string? PhoneNumber { get; set; }

        public string? PasswordHash { get; set; }
    }
}
