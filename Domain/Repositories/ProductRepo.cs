using Contracts.Requests;
using Contracts.Requests.Product;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

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
                .Include(x => x.Company)
                .Include(x => x.Category)
                .Include(x => x.Subcategory)
                .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
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
                .Where(x => request.Name == null || x.Name.Contains(request.Name));

            //this is an improvised way to sort
            //not sure if it will work this way
            //will see if I can remove the orerby label, however this should effectively randomize the default sort
            //check if this sorting works at all

            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Name);
                        else
                            products = products.OrderByDescending(x => x.Name);
                        break;
                    case SortAttributeType.SortByPrice:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Price);
                        else
                            products = products.OrderByDescending(x => x.Price);
                        break;
                    case SortAttributeType.SortByQuantity:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Quantity);
                        else
                            products = products.OrderByDescending(x => x.Quantity);
                        break;
                    case SortAttributeType.SortByCategoryName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Category.Name);
                        else
                            products = products.OrderByDescending(x => x.Name);
                        break;
                    case SortAttributeType.SortBySubcategoryName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Subcategory.Name);
                        else
                            products = products.OrderByDescending(x => x.Subcategory.Name);
                        break;
                    case SortAttributeType.SortByCompanyName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Company.Name);
                        else
                            products = products.OrderByDescending(x => x.Company.Name);
                        break;
                    case SortAttributeType.SortByUpdated:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.UpdatedAt);
                        else
                            products = products.OrderByDescending(x => x.UpdatedAt);
                        break;
                    case SortAttributeType.SortByProfit:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Transactions.Count * x.Price);
                        else
                            products = products.OrderByDescending(x => x.Transactions.Count * x.Price);
                        break;
                    case SortAttributeType.SortByTotalSold:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Transactions.Count);
                        else
                            products = products.OrderByDescending(x => x.Transactions.Count);
                        break;
                    default: break;
                }
            }

            //after sorting pagination is implemented

            if (request.Pagination != null)
            {
                products = products.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            }

            return await products
                .ToListAsync(cancellationToken);
        }

        public async Task<List<Product>> GetAllProductsWithFavourites(GetAllProductsRequest request, CancellationToken cancellationToken)
        {

            var products = _context.Products
                .Include(x => x.Company)
                .Include(x => x.Category)
                .Include(x => x.Subcategory)
                .Include(x => x.Favourites)
                .Where(x => request.SubcategoryId == null || request.SubcategoryId == x.SubCategoryId)
                .Where(x => request.CategoryId == null || request.CategoryId == x.CategoryId)
                .Where(x => request.MaxPrice == null || request.MaxPrice >= x.Price)
                .Where(x => request.MinPrice == null || request.MinPrice <= x.Price)
                .Where(x => request.CompanyId == null || request.CompanyId == x.CompanyId)
                .Where(x => request.Name == null || x.Name.ToLower().Contains(request.Name.ToLower()));

            //this is an improvised way to sort
            //not sure if it will work this way
            //will see if I can remove the orerby label, however this should effectively randomize the default sort
            //check if this sorting works at all

            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Name);
                        else
                            products = products.OrderByDescending(x => x.Name);
                        break;
                    case SortAttributeType.SortByPrice:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Price);
                        else
                            products = products.OrderByDescending(x => x.Price);
                        break;
                    case SortAttributeType.SortByQuantity:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Quantity);
                        else
                            products = products.OrderByDescending(x => x.Quantity);
                        break;
                    case SortAttributeType.SortByCategoryName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Category.Name);
                        else
                            products = products.OrderByDescending(x => x.Name);
                        break;
                    case SortAttributeType.SortBySubcategoryName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Subcategory.Name);
                        else
                            products = products.OrderByDescending(x => x.Subcategory.Name);
                        break;
                    case SortAttributeType.SortByCompanyName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Company.Name);
                        else
                            products = products.OrderByDescending(x => x.Company.Name);
                        break;
                    case SortAttributeType.SortByUpdated:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.UpdatedAt);
                        else
                            products = products.OrderByDescending(x => x.UpdatedAt);
                        break;
                    case SortAttributeType.SortByProfit:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Transactions.Count * x.Price);
                        else
                            products = products.OrderByDescending(x => x.Transactions.Count * x.Price);
                        break;
                    case SortAttributeType.SortByTotalSold:
                        if (request.Sorting.SortType == SortType.Ascending)
                            products = products.OrderBy(x => x.Transactions.Count);
                        else
                            products = products.OrderByDescending(x => x.Transactions.Count);
                        break;
                    default: break;
                }
            }


            //after sorting pagination is implemented

            if (request.Pagination != null)
            {
                products = products.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            }

            return await products
                .ToListAsync(cancellationToken);
        }

        public async Task<List<Product>> GetSimilar(GetSimilarProductsRequest request, CancellationToken cancellationToken)
        {
            return await _context.Products
                .Include(x => x.Company)
                .Where(x => x.Id != request.Id)
                .Where(x => x.SubCategoryId == request.SubcategoryId)
                .OrderBy(x => Math.Abs(x.Price - request.Price))
                .Take(10)
                .ToListAsync(cancellationToken);

        }

        public async Task<List<Product>> GetFavourites(Guid userId)
        {
            var favourites = await _context.Favourites
                .Include(x => x.Product.Company)
                .Include(x => x.Product.Category)
                .Include(x => x.Product.Subcategory)
                .Where(x => x.UserId == userId)
                .Select(x => x.Product)
                .ToListAsync();
            return favourites;
        }





    }
}
