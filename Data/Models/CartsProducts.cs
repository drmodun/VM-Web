﻿namespace Data.Models
{
    public class CartsProducts
    {
        public Guid CartId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}