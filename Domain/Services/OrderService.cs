﻿using Contracts.Requests.Order;
using Contracts.Responses;
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


            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : list.Count,
                TotalItems = list.Count,
                TotalPages = request.Pagination != null ? (list.Count + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };

            return new GetAllOrdersResponse
            {
                Items = list,
                PageInfo = pageInfo
            };

        }
    }
}
