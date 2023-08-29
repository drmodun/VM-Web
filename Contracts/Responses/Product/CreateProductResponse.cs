namespace Contracts.Responses.Product
{
    public class CreateProductResponse
    {
        public bool Success { get; set; }
        public Guid? Id
        {
            get; set;
        }
    }
}
