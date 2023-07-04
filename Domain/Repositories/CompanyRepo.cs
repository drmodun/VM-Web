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

        public async Task<List<Company>> GetAllcompanies(GetAllCompaniesRequest request, CancellationToken cancellationToken)
        {
            var companies = _context.Companies
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
                .OrderBy(x => Guid.NewGuid());
            //sorting
            //possibly later change logic of sorting to be more dynamic

            switch (request.Sorting.SortByName)
            {
                case SortType.Ascending:
                    companies.ThenBy(x => x.Name); break;
                case SortType.Descending:
                    companies.ThenByDescending(x => x.Name); break;
                default:
                    break;
            }

            if (request.Pagination != null)
            {
                companies.Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageNumber);
                companies.Take(request.Pagination.PageSize);
            }
            return await companies.ToListAsync(cancellationToken);


        }
    }
}
