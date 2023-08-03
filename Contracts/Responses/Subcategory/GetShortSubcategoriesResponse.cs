namespace Contracts.Responses.Subcategory
{
    public class GetShortSubcategoriesResponse
    {
        public List<GetShortSubcategoryResponse> Items { get; set; }
        public PageResponse? PageInfo { get; set; }
    }
}
