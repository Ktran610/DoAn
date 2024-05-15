namespace DtuChatBot.Dtos.UserDtos
{
    public class CreateUserModel
    {
        public string? UserName { get; set; }

        public int? RoleId { get; set; }

        public string? PasswordHash { get; set; }
    }
}
