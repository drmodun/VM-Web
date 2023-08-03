using Contracts.Requests;
using Contracts.Requests.Subcategory;
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

        public async Task<IQueryable<Subcategory>> GetAllSubcategories(GetAllSubcategoriesRequest request, CancellationToken cancellationToken)
        {
            var subcategories = _context.Subcategories
                .Include(x => x.Category)
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
                .Where(x => request.CategoryId == null || x.CategoryId == request.CategoryId);
            //sorting
            //possibly later change logic of sorting to be more dynamic
            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            subcategories = subcategories.OrderBy(x => x.Name);
                        else
                            subcategories = subcategories.OrderByDescending(x => x.Name);
                        break;

                    case SortAttributeType.SortByCategoryName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            subcategories = subcategories.OrderBy(x => x.Category.Name);
                        else
                            subcategories = subcategories.OrderByDescending(x => x.Name);
                        break;

                    default: break;
                }
            }
            return subcategories;


        }
        public async Task<IQueryable<Subcategory>> GetAllShortSubcategories(GetAllSubcategoriesRequest request, CancellationToken cancellationToken)
        {
            var subcategories = _context.Subcategories
                .Include(x => x.Products)
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
                .Where(x => request.CategoryId == null || x.CategoryId == request.CategoryId);
            //sorting
            //possibly later change logic of sorting to be more dynamic
            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            subcategories = subcategories.OrderBy(x => x.Name);
                        else
                            subcategories = subcategories.OrderByDescending(x => x.Name);
                        break;

                    case SortAttributeType.SortByCategoryName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            subcategories = subcategories.OrderBy(x => x.Category.Name);
                        else
                            subcategories = subcategories.OrderByDescending(x => x.Name);
                        break;

                    default: break;
                }
            }
            return subcategories;
        }
        public async Task<Subcategory> GetLargeSubcategory(Guid id, CancellationToken cancellationToken)
        {
            var subcategory = await _context.Subcategories
                .Include(x => x.Category)
              .Include(x => x.Products)
                      .ThenInclude(x => x.Company)
                          .ThenInclude(x => x.Products)
                  .Include(x => x.Products)
                  .FirstOrDefaultAsync(x => x.Id == id);
            if (subcategory == null)
                return null;
            return subcategory;
        }
    }
}