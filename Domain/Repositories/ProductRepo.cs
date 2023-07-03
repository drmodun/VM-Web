using Data;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public class ProductRepo
    {
        private readonly Context _context;
        private readonly ProductValidator _validator;

        public ProductRepo(Context context, ProductValidator validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<bool> CreateProduct(Product product)
        {
            await _validator.ValidateAndThrowAsync(product);
            await _context.Products.AddAsync(product);
            return await _context.SaveChangesAsync() > 0;
        }
                
        public async Task<bool> UpdateProduct(Product product)
        {
            _context.Products.Update(product);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
