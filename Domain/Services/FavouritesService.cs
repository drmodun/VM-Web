using Data.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
