using Contracts.Requests.Product;
using Contracts.Responses.Product;
using Data.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace Domain.Mappers
{
    public class ProductMapper
    {
        public static GetProductResponse ToDTO(Product product, Guid? userId = null)
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
                IsFavourite = userId != null && product.Favourites.Any(x=>x.UserId == userId) ,
                CartQuantity = userId != null ? 
                product.CartsProducts.FirstOrDefault(x => x.Cart.UserId == userId) != null 
                ? product.CartsProducts.FirstOrDefault(x => x.Cart.UserId == userId).Quantity 
                : 0 
                : 0
                //TODO: fix this
            };
        }
        public static Product ToEntity(CreateProductRequest request)
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

        public static Product ToUpdated(PutProductRequest request)
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

        public static GetSimilarProductsResponse ToSimilar(Product product)
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

        public static GetShortProductResponse ToShortProduct(Product product, Guid? userId = null)
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
                IsFavourite = userId != null && product.Favourites.Any(x => x.UserId == userId),
                IsInCart = userId != null && product.CartsProducts.Any(x => x.Cart.UserId == userId)
                //later change this
            };
        }

        public static GetShortProductResponse ToFavouriteShortProducts(Guid userId, Product product)
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
                IsInCart = product.CartsProducts.Any(x => x.Cart.UserId == userId)
            };
        }
    }
}
