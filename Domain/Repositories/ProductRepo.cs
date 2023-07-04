using Contracts.Requests.Product;
using Contracts.Responses.Product;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Mappers;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
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

        public async Task<bool> CreateProduct(Product product, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(product, cancellationToken);
            await _context.Products.AddAsync(product, cancellationToken);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }
                
        public async Task<bool> UpdateProduct(Product product, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(product, cancellationToken);
            _context.Products.Update(product);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteProduct(Guid id, CancellationToken cancellationToken)
        {
            var productToRemove = await _context.Products.FindAsync(id, cancellationToken);
            _context.Products.Remove(productToRemove);
            return await _context.SaveChangesAsync(cancellationToken) > 0;



        }

        public async Task<Product?> GetProduct(Guid id, CancellationToken cancellationToken)
        {
            var product = await _context.Products
                .Include(x=>x.Company)
                .Include(x=>x.Category)
                .Include(x=>x.Subcategory)
                .FirstOrDefaultAsync(b=>b.Id == id, cancellationToken);
            if (product is null)
                return null;
            return product;
        }

        public async Task<List<Product>> GetAllProducts(GetAllProductsRequest request, CancellationToken cancellationToken)
        {

            var products = _context.Products
                .Include(x => x.Company)
                .Include(x => x.Category)
                .Include(x => x.Subcategory)
                .Where(x => request.SubcategoryId == null || request.SubcategoryId == x.SubCategoryId)
                .Where(x => request.CategoryId == null || request.CategoryId == x.CategoryId)
                .Where(x => request.MaxPrice == null || request.MaxPrice >= x.Price)
                .Where(x => request.MinPrice == null || request.MinPrice <= x.Price)
                .Where(x => request.CompanyId == null || request.CompanyId == x.CompanyId)
                .Where(x => x.Name.Contains(request.Name))
                .OrderBy(x => Guid.NewGuid());

            //this is an improvised way to sort
            //not sure if it will work this way
            //will see if I can remove the orerby label, however this should effectively randomize the default sort
            //check if this sorting works at all
            switch (request.Sorting.SortByName)
            {
                case SortType.Ascending:
                    products.ThenBy(x => x.Name);
                    break;
                case SortType.Descending:
                    products.ThenByDescending(x => x.Name);
                    break;
                default: break;
            }

            switch (request.Sorting.SortByQuantity)
            {
                case SortType.Ascending:
                    products.ThenBy(x => x.Quantity);
                    break;
                case SortType.Descending:
                    products.ThenByDescending(x => x.Quantity);
                    break;
                default: break;
            }

            switch (request.Sorting.SortByPrice)
            {
                case SortType.Ascending:
                    products.ThenBy(x => x.Price);
                    break;
                case SortType.Descending:
                    products.ThenByDescending(x => x.Price);
                    break;
                default: break;
            }



            //after sorting pagination is implemented

            return await products
                .Skip(request.Pagination.PageNumber - 1 * request.Pagination.PageSize)
                .Take(request.Pagination.PageSize)
                .ToListAsync(cancellationToken);
        }






    }
}
