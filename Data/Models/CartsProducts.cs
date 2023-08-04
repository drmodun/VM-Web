namespace Data.Models
{
    public class CartsProducts
    {
        public Guid CartId { get; set; }
        public Guid ProductId { get; set; }
        public Cart Cart { get; set; }

        public Product Product { get; set; }
        public int Quantity { get; set; }
    }
}
