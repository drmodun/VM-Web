namespace Data.Models
{
    public class Cart
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        //later add other important properties
        public User User { get; set; }
        public List<CartsProducts> CartsProducts { get; set; } = new List<CartsProducts>();

    }
}
