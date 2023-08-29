using System.Text.Json;

namespace Contracts.Requests.Product
{
    public class CreateProductRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public Guid CategoryId { get; set; }
        public Guid SubCategoryId { get; set; }

        public JsonDocument SubAttributes { get; set; }

        public JsonDocument Attributes { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Guid CompanyId { get; set; }
    }
}
