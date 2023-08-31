using Contracts.Requests;
using Contracts.Requests.Category;
using Contracts.Requests.Product;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class CategoryRepo
    {
        private readonly Context _context;
        private readonly CategoryValidator _validator;
        public CategoryRepo(Context context, CategoryValidator validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<bool> CreateCategory(Category category, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(category, cancellationToken);
            await _context.Categories.AddAsync(category, cancellationToken);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> UpdateCategory(Category category, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(category, cancellationToken);
            _context.Categories.Update(category);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteCategory(Guid id, CancellationToken cancellationToken)
        {
            var category = await _context.Categories.FindAsync(id, cancellationToken);
            if (category == null) { return false; }
            _context.Categories.Remove(category);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<Category?> GetCategory(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Categories.FindAsync(id, cancellationToken);
        }

        public async Task<IQueryable<Category>> GetAllCategories(GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            //add to lower on filters here
            var categories = _context.Categories
                .Where(x => request.Name == null || x.Name.ToLower().Contains(request.Name.ToLower()))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
;            //sorting

            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            categories = categories.OrderBy(x => x.Name);
                        else
                            categories = categories.OrderByDescending(x => x.Name);
                        break;
                    default: break;
                }
            }
            return categories;
            //add asNoTracking to every query
        }

        public async Task<IQueryable<Category>> GetShortCategories(GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            var categories = _context.Categories
                .Include(x => x.Products)
                .Where(x => request.Name == null || x.Name.ToLower().Contains(request.Name.ToLower()))
                    .AsNoTracking();
            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            categories = categories.OrderBy(x => x.Name);
                        else
                            categories = categories.OrderByDescending(x => x.Name);
                        break;
                    case SortAttributeType.SortByQuantity:
                        if (request.Sorting.SortType == SortType.Ascending)
                            categories = categories.OrderBy(x => x.Products.Count);
                        else
                            categories = categories.OrderByDescending(x => x.Products.Count);
                        break;
                    //think about adding a populraity filter
                    default: break;
                }
            }
            return categories;
        }
        public async Task<Category?> GetLargeCategory(Guid id, CancellationToken cancellationToken)
        {
            //also very expensive might optimise later
            var category = await _context.Categories
                .Include(x => x.Products)
                        .ThenInclude(x => x.Company)
                            .ThenInclude(x => x.Products.Count)
                    .Include(x => x.Subcategories)
                        .ThenInclude(x => x.Products)
                    .FirstOrDefaultAsync(x => x.Id == id);
            if (category == null)
                return null;
            return category;

        }
    }
}
