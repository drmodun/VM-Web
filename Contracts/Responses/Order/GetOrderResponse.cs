﻿using Data.Enums;

namespace Contracts.Responses.Order
{
    public class GetOrderResponse
    {
        public Guid Id { get; set; }
        public Guid ServiceId { get; set; }
        public string ServiceName { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public ServiceType ServiceType { get; set; }
        public decimal Price { get; set; }

        public string Description { get; set; }

        public string Email { get; set; }
        //predicting that the price is not gonna change

        public StatusType StatusType { get; set; }

        public DateTime Created { get; set; }

        public DateTime? Deadline { get; set; }
    }
}
