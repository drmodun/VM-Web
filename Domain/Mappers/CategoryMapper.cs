﻿using Contracts.Requests.Category;
using Contracts.Responses.Category;
using Data.Models;

namespace Domain.Mappers
{
    public class CategoryMapper
    {
        public GetCategoryResponse ToDTO(Category category)
        {
            return new GetCategoryResponse
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                Schema = category.Schema,
            };
        }
        public Category ToEntity(CreateCategoryRequest request)
        {
            return new Category
            {
                Schema = request.Schema,
                Name = request.Name,
                Description = request.Description,
                Id = Guid.NewGuid(),
            };
        }
        public Category ToUpdated(PutCategoryRequest request)
        {
            return new Category
            {
                Schema = request.Schema,
                Name = request.Name,
                Description = request.Description,
                Id = request.Id
            };
        }

    }
}
