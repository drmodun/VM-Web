using Contracts.Requests.Order;
using Contracts.Responses.Order;
using Data.Enums;
using Data.Models;

namespace Domain.Mappers
{
    public static class OrderMapper
    {
        public static GetOrderResponse ToDTO(Order order)
        {
            return new GetOrderResponse
            {
                Created = order.Created,
                Deadline = order.Deadline,
                Id = order.Id,
                ServiceType = order.Service.ServiceType,
                ServiceId = order.ServiceId,
                ServiceName = order.Service.Name,
                StatusType = order.Status,
                Price = order.Service.Price,
                UserId = order.UserId,
                Description = order.Description,
                Email = order.Email,
                UserName = order.User.Name
            };
        }
        public static Order ToEntity(CreateOrderRequest request)
        {
            return new Order
            {
                Created = DateTime.UtcNow,
                Id = Guid.NewGuid(),
                ServiceId = request.ServiceId,
                UserId = request.UserId,
                Email = request.Email,
                Description = request.Description,
                Status = StatusType.Pending
            };
        }

        public static Order ToUpdated(PutOrderRequest request)
        {
            return new Order
            {
                Created = DateTime.UtcNow,
                Id = request.Id,
                ServiceId = request.ServiceId,
                UserId = request.UserId,
                Status = StatusType.Pending,
                Description = request.Description,
                Email = request.Email,
            };
        }
    }
}
