using Contracts.Requests.Subcategory;
using Contracts.Responses.Subcategory;
using Data.Models;

namespace Domain.Mappers
{
    public class SubcategoryMapper
    {
        public Subcategory ToEntity(CreateSubcategoryRequest request)
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
        public Subcategory ToUpdated(PutSubcategoryRequest request)
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
        public GetSubcategoryResponse ToDTO(Subcategory subcategory)
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

    }
}
