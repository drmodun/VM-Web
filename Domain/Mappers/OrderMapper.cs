using Contracts.Requests.Order;
using Contracts.Responses.Order;
using Data.Enums;
using Data.Models;

namespace Domain.Mappers
{
    public class OrderMapper
    {
        public GetOrderResponse ToDTO(Order order)
        {
            return new GetOrderResponse
            {
                Created = order.Created,
                Deadline = order.Deadline,
                Id = order.Id,
                ServiceId = order.ServiceId,
                ServiceName = order.Service.Name,
                StatusType = order.Status,
                UserId = order.UserId,
                UserName = order.User.Name
            };
        }
        public Order ToEntity(CreateOrderRequest request)
        {
            return new Order
            {
                Created = DateTime.Now,
                Id = Guid.NewGuid(),
                ServiceId = request.ServiceId,
                UserId = request.UserId,
                Status = StatusType.Pending
            };
        }

        public Order ToUpdated(PutOrderRequest request)
        {
            return new Order
            {
                Created = DateTime.Now,
                Id = request.Id,
                ServiceId = request.ServiceId,
                UserId = request.UserId,
                Status = StatusType.Pending
            };
        }
    }
}
