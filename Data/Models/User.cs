namespace Data.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public DateTime LastUpdated { get; set; }
        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public string Role { get; set; }

        public List<Transaction> Transactions { get; set; } = new List<Transaction>();

        public List<Order> Orders { get; set; } = new List<Order>();

        public Dictionary<string, string> Claims { get; set; } = new Dictionary<string, string>();



    }
}
