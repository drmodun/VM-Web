namespace Data.Models
{
    public class Company
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Logo { get; set; }

        public string Description { get; set; }

        public string Website { get; set; }

        public List<Product> Products { get; set; } = new List<Product>();

    }
}
