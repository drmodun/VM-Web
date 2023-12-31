﻿namespace Contracts.Responses.Category
{
    public class GetCategoryResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Dictionary<string, string> Schema { get; set; }
        public Guid Id { get; set; }
    }
}
