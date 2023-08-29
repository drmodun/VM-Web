namespace Contracts.Responses.Product
{
    public class GetShortProductResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public decimal Price { get; set; }

        public Guid SubcategoryId { get; set; }
        public string SubcategoryName { get; set; }

        public Guid CategoryId { get; set; }

        public string CategoryName { get; set; }

        public Guid CompanyId { get; set; }
        public string CompanyName { get; set; }

        public bool IsFavourite { get; set; }

        public bool IsInCart { get; set; }
    }
}
