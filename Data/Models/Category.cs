﻿namespace Data.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Dictionary<string, string> Schema { get; set; }

        public List<Product> Products { get; set; } = new List<Product>();
        public List<Subcategory> Subcategories { get; set; } = new List<Subcategory>();
    }
}
