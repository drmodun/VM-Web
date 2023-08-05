using Contracts.Responses.Cart;
using Data.Models;

namespace Domain.Mappers
{
    public static class CartMapper
    {
        public static ConnectionResponse ToConnectionDTO(CartsProducts cartsProducts)
        {
            return new ConnectionResponse
            {
                Quantity = cartsProducts.Quantity,
                BrandName = cartsProducts.Product.Company.Name,
                CategoryId = cartsProducts.Product.CategoryId,
                CategoryName = cartsProducts.Product.Category.Name,
                SubcategoryName = cartsProducts.Product.Subcategory.Name,
                SubcategoryId = cartsProducts.Product.SubCategoryId,
                BrandId = cartsProducts.Product.CompanyId,
                ProductId = cartsProducts.ProductId,
                ProductName = cartsProducts.Product.Name,
                PricePerUnit = cartsProducts.Product.Price,
                Total = cartsProducts.Product.Price * cartsProducts.Quantity,
                MaxQuantity = cartsProducts.Product.Quantity
            };
        }
        public static CartResponse ToDTO(Cart cart)
        {
            return new CartResponse
            {
                Items = cart.CartsProducts.Select(CartMapper.ToConnectionDTO).ToList(),
                TotalPrice = cart.CartsProducts.Sum(x => x.Product.Price * x.Quantity)
            };
        }
    }
}
