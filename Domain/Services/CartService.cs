using Contracts.Responses.Cart;
using Domain.Mappers;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class CartService
    {
        private readonly CartRepo _cartRepo;
        public CartService(CartRepo cartRepo)
        {
            _cartRepo = cartRepo;
        }

        public async Task<CartResponse?> GetCart(Guid userId, CancellationToken cancellationToken)
        {
            var cart = await _cartRepo.GetCart(userId, cancellationToken);
            if (cart == null) { return null; }
            return CartMapper.ToDTO(cart);
        }

        public async Task<bool> AddToCart(Guid userId, Guid productId, int quantity, CancellationToken cancellationToken)
        {
            var action = await _cartRepo.AddToCart(userId, productId, quantity,cancellationToken);
            return action;
        }

        public async Task<bool> RemoveFromCart(Guid userId, Guid productId, CancellationToken cancellationToken)
        {
            var action = await _cartRepo.RemoveFromCart(userId, productId, cancellationToken);
            return action;
        }

        public async Task<bool> UpdateConnection(Guid userId, Guid productId, int quantity, CancellationToken cancellationToken)
        {
            var action = await _cartRepo.UpdateConnection(userId, productId, quantity, cancellationToken);
            return action;
        }

        public async Task<bool> RemoveCart(Guid userId, CancellationToken cancellationToken)
        {
            var action = await _cartRepo.RemoveCart(userId, cancellationToken);
            return action;
        }
        public async Task<bool> BuyCart(Guid userId, CancellationToken cancellationToken)
        {
            var action = await _cartRepo.BuyCart(userId, cancellationToken);
            return action;
        }
        public async Task<bool> DeleteCart(Guid userId, CancellationToken cancellationToken)
        {
                var action = await _cartRepo.RemoveCart(userId, cancellationToken);
                return action;
        }

    }
}
