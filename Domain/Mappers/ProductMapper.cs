using Contracts.Requests.Product;
using Contracts.Responses.Product;
using Data.Models;

namespace Domain.Mappers
{
    public class ProductMapper
    {
        public GetProductResponse ToDTO(Product product)
        {
            return new GetProductResponse
            {
                Id = product.Id,
                Attributes = product.Attributes,
                SubAttributes = product.SubAttributes,
                Name = product.Name,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                CompanyId = product.CompanyId,
                CompanyName = product.Company.Name,
                Description = product.Description,
                Price = product.Price,
                Quantity = product.Quantity,
                SubcategoryName = product.Subcategory.Name,
                SubcategoryId = product.Subcategory.Id,

            };
        }
        public Product ToEntity(CreateProductRequest request)
        {
            return new Product
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                CategoryId = request.CategoryId,
                Attributes = request.Attributes,
                SubAttributes = request.SubAttributes,
                CompanyId = request.CompanyId,
                Description = request.Description,
                Price = request.Price,
                SubCategoryId = request.SubCategoryId,
                Image = request.Image,
                Quantity = request.Quantity,
                UpdatedAt = DateTime.Now,
            };
        }

        public Product ToUpdated(PutProductRequest request)
        {
            return new Product
            {
                Id = request.Id,
                Name = request.Name,
                CategoryId = request.CategoryId,
                Attributes = request.Attributes,
                SubAttributes = request.SubAttributes,
                CompanyId = request.CompanyId,
                Description = request.Description,
                Price = request.Price,
                SubCategoryId = request.SubCategoryId,
                Image = request.Image,
                Quantity = request.Quantity,
                UpdatedAt = DateTime.Now,

            };
        }
    }
}
