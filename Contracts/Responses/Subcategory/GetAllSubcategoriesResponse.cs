namespace Contracts.Responses.Subcategory
{
    public class GetAllSubcategoriesResponse
    {
        public PageResponse PageInfo { get; set; }
        public List<GetSubcategoryResponse> Subcategories { get; set; }
    }
}
