using Contracts.Requests;
using Contracts.Requests.Company;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class CompanyRepo
    {
        private readonly Context _context;
        private readonly CompanyValidator _validator;
        public CompanyRepo(Context context, CompanyValidator validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<bool> CreateCompany(Company company, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(company, cancellationToken);
            await _context.Companies.AddAsync(company, cancellationToken);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> UpdateCompany(Company company, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(company, cancellationToken);
            _context.Companies.Update(company);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteCompany(Guid id, CancellationToken cancellationToken)
        {
            var company = await _context.Companies.FindAsync(id, cancellationToken);
            if (company == null) { return false; }
            _context.Companies.Remove(company);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<Company?> GetCompany(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Companies.FindAsync(id, cancellationToken);
        }

        public async Task<IQueryable<Company>> GetAllCompanies(GetAllCompaniesRequest request, CancellationToken cancellationToken)
        {
            var companies = _context.Companies
                .Where(x => request.Name == null || x.Name.ToLower().Contains(request.Name.ToLower()))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
                ;
            //sorting
            //possibly later change logic of sorting to be more dynamic

            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            companies = companies.OrderBy(x => x.Name);
                        else
                            companies = companies.OrderByDescending(x => x.Name);
                        break;

                    default: break;
                }
            }
            return companies;
        }

        public async Task<Company?> GetLargeCompany(Guid id, CancellationToken cancellationToken)
        {
            var company = await _context
                .Companies
                .Include(x => x.Products).ThenInclude(x => x.Subcategory)
                    .Include(x => x.Products)
                    .ThenInclude(x => x.Category)
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
            return company;
        }
        public async Task<IQueryable<Company>> GetAllShortCompanies(GetAllCompaniesRequest request, CancellationToken cancellationToken)
        {
            var companies = _context.Companies
                .Include(x => x.Products)
                .Where(x => request.Name == null || x.Name.ToLower().Contains(request.Name.ToLower()))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
                ;
            //sorting
            //possibly later change logic of sorting to be more dynamic

            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            companies = companies.OrderBy(x => x.Name);
                        else
                            companies = companies.OrderByDescending(x => x.Name);
                        break;

                    default: break;
                }
            }


            return companies;


        }
    }
}
