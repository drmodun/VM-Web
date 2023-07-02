﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Product
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public decimal Price { get; set; } 

        public int Quantity { get; set; }

        public string Image { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public Guid CategoryId { get; set; }
        public Category? Category { get; set; }
        public Guid SubCategoryId { get; set;}

        public Guid CompanyId { get; set; }

        public List<Transaciton> Transactions { get; set; }
        public Company? Company { get; set; }
        public Subcategory? Subcategory { get; set; }

        public JsonDocument Attributes { get; set; }

        public JsonDocument SubAttributes { get; set; }



    }
}
