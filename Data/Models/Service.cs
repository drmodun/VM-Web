namespace Data.Models
{
    public class Service
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ServiceType { get; set; }

        public List<Order> Orders { get; set; }
        public decimal Price { get; set; }


    }
}
