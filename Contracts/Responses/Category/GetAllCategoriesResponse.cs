﻿namespace Contracts.Responses.Category
{
    public class GetAllCategoriesResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetCategoryResponse> Items { get; set; }
    }
}
