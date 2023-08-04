using Contracts.Requests.Subcategory;
using Contracts.Responses.Subcategory;
using Data.Models;

namespace Domain.Mappers
{
    public static class SubcategoryMapper
    {
        public static Subcategory ToEntity(CreateSubcategoryRequest request)
        {
            return new Subcategory
            {
                Description = request.Description,
                CategoryId = request.CategoryId,
                Name = request.Name,
                Id = Guid.NewGuid(),
                SubSchema = request.SubSchema,
            };
        }
        public static Subcategory ToUpdated(PutSubcategoryRequest request)
        {
            return new Subcategory
            {
                Description = request.Description,
                CategoryId = request.CategoryId,
                Name = request.Name,
                Id = request.Id,

                SubSchema = request.SubSchema,
            };
        }
        public static GetSubcategoryResponse ToDTO(Subcategory subcategory)
        {
            return new GetSubcategoryResponse
            {
                Description = subcategory.Description,
                CategoryId = subcategory.CategoryId,
                Name = subcategory.Name,
                CategoryName = subcategory.Category.Name,
                SubSchema = subcategory.SubSchema,
                Id = subcategory.Id
            };
        }

        public static GetLargeSubcategoryRssponse ToLarge(Subcategory subcategory)
        {
            return new GetLargeSubcategoryRssponse
            {
                CategoryId = subcategory.CategoryId,
                Name = subcategory.Name,
                CategoryName = subcategory.Category.Name,
                Description = subcategory.Description,
                Id = subcategory.Id,
                Brands = subcategory.Products.DistinctBy(x => x.CompanyId)
                .Select(x => CompanyMapper.ToShort(x.Company)).ToList()
            };
        }

        public static GetShortSubcategoryResponse ToShort(Subcategory subcategory)
        {
            return new GetShortSubcategoryResponse
            {
                Name = subcategory.Name,
                Id = subcategory.Id,
                NumberOfProducts = subcategory.Products.Count(),
            };
        }

    }
}
