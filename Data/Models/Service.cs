﻿using Data.Enums;

namespace Data.Models
{
    public class Service
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ServiceType ServiceType { get; set; }
        public List<Order> Orders { get; set; } = new List<Order>();
        public decimal Price { get; set; }


    }
}
