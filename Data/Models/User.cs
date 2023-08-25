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
        public bool IsEmailConfirmed { get; set; }
        public string Role { get; set; }
        public string ActivationCode { get; set; }
        public List<Transaction> Transactions { get; set; } = new List<Transaction>();

        public List<Order> Orders { get; set; } = new List<Order>();

        public Guid? CartId { get; set; }
        public Cart? Cart { get; set; }

        public Dictionary<string, string> Claims { get; set; } = new Dictionary<string, string>();

        public List<Favourites> Favourites { get; set; } = new List<Favourites>();

        public string? CustomerId { get; set; }

    }
}
