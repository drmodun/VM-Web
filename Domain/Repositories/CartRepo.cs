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

        public async Task<Cart?> GetCart(Guid userId, CancellationToken cancellationToken)
        {
            var cart = await _context.Carts
                .Include(x => x.CartsProducts)
                    .ThenInclude(x => x.Product).ThenInclude(x => x.Category)
                    .Include(x => x.CartsProducts)
                    .ThenInclude(x => x.Product).ThenInclude(x => x.Subcategory)
                    .Include(x => x.CartsProducts)
                    .ThenInclude(x => x.Product).ThenInclude(x => x.Company)
                //decide if this information is neccesary or it just hogs memory
                .FirstOrDefaultAsync(x => x.UserId == userId, cancellationToken);
            return cart;
        }
        public async Task<bool> AddToCart(Guid userId, Guid productId, int quantity, CancellationToken cancellationToken)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
            if (cart == null)
            {
                await CreateCart(userId);
                cart = await _context.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
            }
            var connection = await GetConnection(userId, productId, cancellationToken);
            var product = await _context.Products.FindAsync(productId);
            if (cart == null || product == null || connection != null)
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

        public async Task<bool> RemoveCart(Guid userId, CancellationToken cancellationToken)
        {
            var cart = _context.Carts.FirstOrDefault(x => x.UserId == userId);
            if (cart == null) { return false; }
            _context.Carts.Remove(cart);
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
            return await _context.CartsProducts.AnyAsync(x => x.CartId == cart.Id && x.ProductId == productId);
        }

        public async Task<bool> UpdateConnection(Guid userId, Guid productId, int quantity, CancellationToken cancellationToken)
        {
            var connection = await GetConnection(userId, productId, cancellationToken);
            if (connection == null) { return false; };
            if (quantity < 0) { return false; }
            //see if quantity is even important for this
            connection.Quantity = quantity;
            _context.CartsProducts.Update(connection);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> BuyCart(Guid userId, CancellationToken cancellationToken)
        {
            var cart = await GetCart(userId, cancellationToken);
            if (cart == null) { return false; };
            var transactions = new List<Transaction>();
            foreach (var item in cart.CartsProducts)
            {
                var value = new Transaction
                {
                    CreatedAt = DateTime.UtcNow,
                    Id = Guid.NewGuid(),
                    ProductId = item.ProductId,
                    UserId = userId,
                    Quantity = item.Quantity,
                    Type = Data.Enums.TransactionType.Paypal
                    //later make this actually work of course
                };
                transactions.Add(value);
            }
            await _context.Transactions.AddRangeAsync(transactions, cancellationToken);
            _context.Carts.Remove(cart);
            Console.WriteLine(transactions);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
