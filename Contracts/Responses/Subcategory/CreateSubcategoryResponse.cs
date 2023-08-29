namespace Contracts.Responses.Subcategory
{
    public class CreateSubcategoryResponse
    {
        public bool Success { get; set; }
        public Guid? Id 
        {
            get; set;
        }
    }
}
