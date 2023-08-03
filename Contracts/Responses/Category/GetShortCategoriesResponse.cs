namespace Contracts.Responses.Category
{
    public class GetShortCategoriesResponse
    {
        public PageResponse? PageInfo { get; set; }

        public List<GetShortCategoryResponse> Items { get; set; }
    }
}
