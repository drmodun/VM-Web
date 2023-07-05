using Contracts.Requests.Order;
using Contracts.Responses.Order;
using Domain.Mappers;
using Domain.Repositories;

namespace Domain.Services
{
    public class OrderService
    {
        private readonly OrderRepo _orderRepo;
        private readonly OrderMapper _orderMapper;

        public OrderService(OrderRepo orderRepo, OrderMapper orderMapper)
        {
            _orderRepo = orderRepo;
            _orderMapper = orderMapper;
        }

        public async Task<bool> CreateOrder(CreateOrderRequest request, CancellationToken cancellationToken)
        {
            var order = _orderMapper.ToEntity(request);
            return await _orderRepo.CreateOrder(order, cancellationToken);
        }

        public async Task<bool> UpdateOrder(PutOrderRequest request, CancellationToken cancellationToken)
        {
            var order = _orderMapper.ToUpdated(request);
            return await _orderRepo.UpdateOrder(order, cancellationToken);
        }

        public async Task<bool> DeleteOrder(Guid id, CancellationToken cancellationToken)
        {
            return await _orderRepo.DeleteOrder(id, cancellationToken);
        }

        public async Task<GetOrderResponse?> GetOrder(Guid id, CancellationToken cancellationToken)
        {
            var order = await _orderRepo.GetOrder(id, cancellationToken);
            if (order is null)
                return null;
            return _orderMapper.ToDTO(order);
        }

        public async Task<List<GetOrderResponse>> GetAllOrders(GetAllOrdersRequest request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepo.GetAllOrders(request, cancellationToken);
            return orders.Select(x => _orderMapper.ToDTO(x)).ToList();
        }
    }
}
