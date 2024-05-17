namespace DtuChatBot.Dtos.UserDtos
{
    public class UpdateUserDto
    {
        public string Id { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public int RoleId { get; set; }

        public string? PasswordHash { get; set; }
    }
}
