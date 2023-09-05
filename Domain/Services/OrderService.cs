using Contracts.Email;
using Contracts.Requests.Order;
using Contracts.Responses;
using Contracts.Responses.Order;
using Data.Enums;
using Data.Models;
using Domain.Mappers;
using Domain.Repositories;
using Email;

namespace Domain.Services
{
    public class OrderService
    {
        private readonly OrderRepo _orderRepo;
        private readonly RazorViewToStringRenderer _viewToStringRenderer;

        public Dictionary<StatusType, string> StatusDictionary { get; set; } = new Dictionary<StatusType, string>() {
            {
                StatusType.InProgress, "In progress"
            },
            {
                StatusType.Pending, "Pending"
            },
            {
                StatusType.Accepted, "Accepted"
            },
            {
                StatusType.Failed, "Failed"
            },
            {
                StatusType.Rejected, "Rejected"
            },
            {
                StatusType.Completed, "Completed"
            },
        };

        public OrderService(OrderRepo orderRepo, RazorViewToStringRenderer razorViewToStringRenderer)
        {
            _orderRepo = orderRepo;
            _viewToStringRenderer = razorViewToStringRenderer;

        }

        public async Task<CreateOrderResponse> CreateOrder(CreateOrderRequest request, CancellationToken cancellationToken)
        {
            var order = OrderMapper.ToEntity(request);
            var action = await _orderRepo.CreateOrder(order, cancellationToken);
            return new CreateOrderResponse
            {
                Success = action
            };
        }

        public async Task<PutOrderResponse> UpdateOrder(PutOrderRequest request, CancellationToken cancellationToken)
        {
            var order = OrderMapper.ToUpdated(request);
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
            return OrderMapper.ToDTO(order);
        }

        public async Task<PutOrderResponse> UpdateOrderInfo(Guid id, UpdateOrderInfoRequest request, CancellationToken cancellationToken)
        {
            var order = await _orderRepo.UpdateAndGetOrder(id, request, cancellationToken);
            if (order == null)
            {
                return new PutOrderResponse { Success = false };
            }
            var model = new OrderUpdateModel
            {
                ServiceName = order.Service.Name,
                Note = request.Note,
                UserName = order.User.Name,
                Status = StatusDictionary[request.Status],
                Link = "https://vm-racunala.store/#/user"
            };
            var newEmail = await _viewToStringRenderer.RenderViewToStringAsync(Templates.OrderUpdateView, model);
            var emailSend = await EmailSender.SendEmail(order.Email, "Order update", newEmail);
            return new PutOrderResponse
            {
                Success =
                order != null && emailSend && newEmail != null
            };


        }

        public async Task<GetAllOrdersResponse> GetAllOrders(GetAllOrdersRequest request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepo.GetAllOrders(request, cancellationToken);


            var pageInfo =
            new PageResponse
            {
                Page = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : orders.Count(),
                TotalItems = orders.Count(),
                TotalPages = request.Pagination != null ? (orders.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
                orders = orders.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            var list = orders.Select(x => OrderMapper.ToDTO(x)).ToList();

            return new GetAllOrdersResponse
            {
                Items = list,
                PageInfo = pageInfo
            };

        }
    }
}
