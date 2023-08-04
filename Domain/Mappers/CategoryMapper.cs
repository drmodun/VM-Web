using Contracts.Requests.Category;
using Contracts.Responses.Category;
using Data.Models;

namespace Domain.Mappers
{
    public static class CategoryMapper
    {
        public static GetCategoryResponse ToDTO(Category category)
        {
            return new GetCategoryResponse
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                Schema = category.Schema,
            };
        }
        public static Category ToEntity(CreateCategoryRequest request)
        {
            return new Category
            {
                Schema = request.Schema,
                Name = request.Name,
                Description = request.Description,
                Id = Guid.NewGuid(),
            };
        }
        public static Category ToUpdated(PutCategoryRequest request)
        {
            return new Category
            {
                Schema = request.Schema,
                Name = request.Name,
                Description = request.Description,
                Id = request.Id
            };
        }
        public static GetShortCategoryResponse ToShort(Category category)
        {
            return new GetShortCategoryResponse
            {
                Id = category.Id,
                Name = category.Name,
                NumberOfProducts = category.Products.Count(),
            };
        }
        public static GetLargeCategoryResponse ToLarge(Category category)
        {
            return new GetLargeCategoryResponse
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                Subcategories = category.Subcategories.Select(SubcategoryMapper.ToShort).ToList(),
                Brands = category.Products.DistinctBy(x => x.CompanyId)
                .Select(x => CompanyMapper.ToShort(x.Company))
                .ToList(),
                //see if i want to implement a product counter for brands and subcategories (possibly will be a very complex call)
            };
        }

    }
}
