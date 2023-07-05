﻿using Contracts.Requests.Subcategory;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class SubcategoryRepo
    {
        private readonly Context _context;
        private readonly SubcategoryValidator _validator;
        public SubcategoryRepo(Context context, SubcategoryValidator validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<bool> CreateSubcategory(Subcategory Subcategory, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(Subcategory, cancellationToken);
            await _context.Subcategories.AddAsync(Subcategory, cancellationToken);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> UpdateSubcategory(Subcategory Subcategory, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(Subcategory, cancellationToken);
            _context.Subcategories.Update(Subcategory);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteSubcategory(Guid id, CancellationToken cancellationToken)
        {
            var Subcategory = await _context.Subcategories.FindAsync(id, cancellationToken);
            if (Subcategory == null) { return false; }
            _context.Subcategories.Remove(Subcategory);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<Subcategory?> GetSubcategory(Guid id, CancellationToken cancellationToken)
        {
            return await _context.
                Subcategories
                .Include(x => x.Category)
                .FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
        }

        public async Task<List<Subcategory>> GetAllSubcategories(GetAllSubcategoriesRequest request, CancellationToken cancellationToken)
        {
            var Subcategories = _context.Subcategories
                .Include(x => x.Category)
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
                .Where(x => request.CategoryId == null || x.CategoryId == request.CategoryId)
                .OrderBy(x => Guid.NewGuid());
            //sorting
            //possibly later change logic of sorting to be more dynamic

            switch (request.Sorting.SortByName)
            {
                case SortType.Ascending:
                    Subcategories.ThenBy(x => x.Name); break;
                case SortType.Descending:
                    Subcategories.ThenByDescending(x => x.Name); break;
                default:
                    break;
            }

            switch (request.Sorting.SortByCategoryName)
            {
                case SortType.Ascending:
                    Subcategories.ThenBy(x => x.Category.Name);
                    break;
                case SortType.Descending:
                    Subcategories.ThenByDescending(x => x.Category.Name);
                    break;
                default:
                    break;
            }

            if (request.Pagination != null)
            {
                Subcategories.Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageNumber);
                Subcategories.Take(request.Pagination.PageSize);
            }
            return await Subcategories.ToListAsync(cancellationToken);


        }
    }
}