using Contracts.Requests.Subcategory;
using Contracts.Responses.Subcategory;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
