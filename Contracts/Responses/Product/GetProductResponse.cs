using System.Text.Json;

namespace Contracts.Responses.Product
{
    public class GetProductResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid Id { get; set; }

        public DateTime LastUpdated { get; set; }

        public string Image { get; set; } = "";
        public Guid CompanyId { get; set; }
        public string CompanyName { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public Guid SubcategoryId { get; set; }
        public string SubcategoryName { get; set; }
        public JsonDocument Attributes { get; set; }
        public JsonDocument SubAttributes { get; set; }
        public int Quantity { get; set; }
        public int CartQuantity { get; set; }
        public bool IsFavourite { get; set; }
        public decimal Price { get; set; }
    }
}
