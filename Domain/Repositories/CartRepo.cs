using Contracts.Responses;
using Data;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class CartRepo
    {
        private readonly Context _context;
        public CartRepo(Context context)
        {
            _context = context;
        }

        public async Task<CartsProducts?> GetConnection(Guid userId, Guid productId, CancellationToken cancellationToken)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
            if (cart == null) { return null; }
            return await _context.CartsProducts.FirstOrDefaultAsync(x => x.CartId == cart.Id && x.ProductId == productId, cancellationToken);
        }

        public async Task<bool> CreateCart(Guid userId)
        {
            var cart = new Cart
            {
                Id = Guid.NewGuid(),
                UserId = userId,
            };
            await _context.Carts.AddAsync(cart);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> AddToCart(Guid userId, Guid productId, int quantity, CancellationToken cancellationToken)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
            if (cart == null)
            {
                await CreateCart(userId);
                cart = await _context.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
            }
            var product = await _context.Products.FindAsync(productId);
            if (cart == null || product == null)
                return false;
            var cartsProducts = new CartsProducts
            {
                CartId = cart.Id,
                ProductId = productId,
                Quantity = quantity,
            };
            await _context.CartsProducts.AddAsync(cartsProducts);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> RemoveFromCart(Guid userId, Guid productId, CancellationToken cancellationToken)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
            if (cart == null) { return false; }
            var connection = await _context.CartsProducts.FindAsync(productId, cart.Id);
            if (connection == null)
            {
                return false;
            }
            _context.CartsProducts.Remove(connection);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }


        public async Task<bool> IsInCart(Guid userId, Guid productId)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
            if (cart == null) { return false; }
            return await _context.CartsProducts.AnyAsync(x=>x.CartId == cart.Id && x.ProductId == productId);
        }

        public async Task<bool> UpdateConnection(Guid userId, Guid productId, int quantity, CancellationToken cancellationToken)
        {
            var connection = await GetConnection(userId, productId, cancellationToken);
            if (connection == null) { return false;};
            connection.Quantity = quantity;
            _context.CartsProducts.Update(connection);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }



    }
}
