using Contracts.Requests.Product;
using Contracts.Responses.Product;
using Data.Models;
using Microsoft.AspNetCore.Builder;

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
                LastUpdated = product.UpdatedAt,
                CategoryName = product.Category.Name,
                CompanyId = product.CompanyId,
                CompanyName = product.Company.Name,
                Description = product.Description,
                Price = product.Price,
                Quantity = product.Quantity,
                SubcategoryName = product.Subcategory.Name,
                SubcategoryId = product.Subcategory.Id,
                Image = product.Image,
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
                UpdatedAt = DateTime.UtcNow,
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
                UpdatedAt = DateTime.UtcNow,

            };
        }

        public GetSimilarProductsResponse ToSimilar(Product product)
        {
            return new GetSimilarProductsResponse
            {
                Id = product.Id,
                CompanyId = product.CompanyId,
                Image = product.Image,
                CompanyName = product.Company.Name,
                Name = product.Name,
                IsInStock = product.Quantity > 0,
                Price = product.Price

            };
        }

        public GetShortProductResponse ToShortProduct(Product product, Guid? userId = null)
        {
            return new GetShortProductResponse
            {
                Id = product.Id,
                CompanyId = product.CompanyId,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                Image = product.Image,
                CompanyName = product.Company.Name,
                Name= product.Name,
                Price= product.Price,
                SubcategoryId = product.SubCategoryId,
                SubcategoryName = product.Subcategory.Name,
                IsFavourite = userId != null && product.Favourites.Any(x=>x.UserId == userId),
                IsInCart = false
                //later change this
            };
        }

        public GetShortProductResponse ToFavouriteShortProducts(Product product)
        {
            return new GetShortProductResponse
            {
                Id = product.Id,
                CompanyId = product.CompanyId,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                Image = product.Image,
                CompanyName = product.Company.Name,
                Name = product.Name,
                Price = product.Price,
                SubcategoryId = product.SubCategoryId,
                SubcategoryName = product.Subcategory.Name,
                IsFavourite = true,
                IsInCart = false
            };
        }
    }
}
