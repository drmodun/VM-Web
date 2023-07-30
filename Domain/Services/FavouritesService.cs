using Domain.Repositories;

namespace Domain.Services
{
    public class FavouritesService
    {
        private readonly FavouritesRepo _favouritesRepo;

        public FavouritesService(FavouritesRepo favouritesRepo)
        {
            _favouritesRepo = favouritesRepo;
        }

        public async Task<bool> CreateFavourite(Guid userId, Guid productId, CancellationToken cancellationToken)
        {
            var action = await _favouritesRepo.AddToFavourites(userId, productId, cancellationToken);
            return action;
        }

        public async Task<bool> DeleteFavourite(Guid userId, Guid productId, CancellationToken cancellationToken)
        {
            var action = await _favouritesRepo.RemoveFromFavourites(userId, productId, cancellationToken);
            return action;
        }


    }
}
