﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Contracts.Requests.Product
{
    public class PutProductRequest
    {
        public Guid ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public Guid CategoryId { get; set; }
        public Guid SubCategoryId { get; set; }

        public JsonDocument SubAttributes { get; set; }

        public JsonDocument Attributes { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Guid CompanyId { get; set; }

    }
}
