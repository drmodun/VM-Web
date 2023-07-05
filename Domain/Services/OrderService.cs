using Contracts.Requests.Order;
using Contracts.Responses;
using Contracts.Responses.Order;
using Domain.Mappers;
using Domain.Repositories;
using System.Runtime.InteropServices;

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

        public async Task<CreateOrderResponse> CreateOrder(CreateOrderRequest request, CancellationToken cancellationToken)
        {
            var order = _orderMapper.ToEntity(request);
            var action = await _orderRepo.CreateOrder(order, cancellationToken);
            return new CreateOrderResponse
            {
                Success = action
            };
        }

        public async Task<PutOrderResponse> UpdateOrder(PutOrderRequest request, CancellationToken cancellationToken)
        {
            var order = _orderMapper.ToUpdated(request);
            var action = await _orderRepo.UpdateOrder(order, cancellationToken);
            return new PutOrderResponse
            {
                Success = action
            };
        }

        public async Task<DeleteOrderResponse> DeleteOrder(Guid id, CancellationToken cancellationToken)
        {
            var action = await _orderRepo.DeleteOrder(id, cancellationToken);
            return new DeleteOrderResponse
            {
                Success = action
            };
        }

        public async Task<GetOrderResponse?> GetOrder(Guid id, CancellationToken cancellationToken)
        {
            var order = await _orderRepo.GetOrder(id, cancellationToken);
            if (order is null)
                return null;
            return _orderMapper.ToDTO(order);
        }

        public async Task<GetAllOrdersResponse> GetAllOrders(GetAllOrdersRequest request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepo.GetAllOrders(request, cancellationToken);
            var list = orders.Select(x => _orderMapper.ToDTO(x)).ToList();


            var pageInfo = request.Pagination is null ? null
            : new PageResponse
            {
                PageNumber = request.Pagination.PageNumber,
                PageSize = request.Pagination.PageSize
            };

            return new GetAllOrdersResponse
            {
                Orders = list,
                PageInfo = pageInfo
            };

        }
    }
}
