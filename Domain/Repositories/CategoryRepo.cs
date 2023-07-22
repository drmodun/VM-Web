﻿using Contracts.Requests;
using Contracts.Requests.Category;
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

        public async Task<List<Category>> GetAllCategories(GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            var categories = _context.Categories
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
;            //sorting
            //possibly later change logic of sorting to be more dynamic

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
            //dont like the amount of nesting but this is the most painless way to do it

            if (request.Pagination != null)
            {
                categories = categories.Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageSize).Take(request.Pagination.PageSize);
            }
            return await categories.ToListAsync(cancellationToken);


        }
    }
}
