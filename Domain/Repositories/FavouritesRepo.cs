using Data;
using Data.Models;

namespace Domain.Repositories
{
    public class FavouritesRepo
    {
        private readonly Context _context;
        public FavouritesRepo(Context context)
        {
            _context = context;
        }

        public async Task<bool> AddToFavourites(Guid userId, Guid productId, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(userId);
            var product = await _context.Products.FindAsync(productId);
            if (user == null || product == null)
                return false;
            var favourite = new Favourites
            {
                UserId = userId,
                ProductId = productId
            };
            await _context.Favourites.AddAsync(favourite);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> RemoveFromFavourites(Guid userId, Guid productId, CancellationToken cancellationToken)
        {
            var favourite = await _context.Favourites.FindAsync(productId, userId);
            if (favourite == null)
            {
                return false;
            }
            _context.Favourites.Remove(favourite);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }


        public async Task<bool> IsFavourite(Guid userId, Guid productId)
        {
            var favourite = await _context.Favourites.FindAsync(userId, productId);
            return favourite != null;
        }

    }
}
