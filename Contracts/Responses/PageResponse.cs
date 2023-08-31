namespace Contracts.Responses
{
    public class PageResponse
    {
        public int Page { get; set; }

        public int PageSize { get; set; }

        public int TotalPages { get; set; }

        public int TotalItems { get; set; }
    }
}
