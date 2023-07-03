namespace Contracts.Requests.User
{
    public class PutUserRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }
    }
}
