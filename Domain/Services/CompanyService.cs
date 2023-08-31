using Contracts.Requests.Company;
using Contracts.Responses;
using Contracts.Responses.Company;
using Domain.Mappers;
using Domain.Repositories;

namespace Domain.Services
{
    public class CompanyService
    {
        private readonly CompanyRepo _companyRepo;

        public CompanyService(CompanyRepo companyRepo)
        {
            _companyRepo = companyRepo;
        }

        public async Task<CreateCompanyResponse> CreateCompany(CreateCompanyRequest request, CancellationToken cancellationToken)
        {
            var company = CompanyMapper.ToEntity(request);
            var action = await _companyRepo.CreateCompany(company, cancellationToken);
            return new CreateCompanyResponse
            {
                Id = company.Id,
                Success = action
            };
        }

        public async Task<PutCompanyResponse> UpdateCompany(PutCompanyRequest request, CancellationToken cancellationToken)
        {
            var company = CompanyMapper.ToUpdated(request);
            var action = await _companyRepo.UpdateCompany(company, cancellationToken);
            return new PutCompanyResponse
            {
                Success = action
            };
        }

        public async Task<DeleteCompanyResponse> DeleteCompany(Guid id, CancellationToken cancellationToken)
        {
            var action = await _companyRepo.DeleteCompany(id, cancellationToken);
            return new DeleteCompanyResponse
            {
                Success = action
            };
        }

        public async Task<GetCompanyResponse?> GetCompany(Guid id, CancellationToken cancellationToken)
        {
            var company = await _companyRepo.GetCompany(id, cancellationToken);
            if (company is null)
                return null;
            return CompanyMapper.ToDTO(company);
        }

        public async Task<GetLargeCompanyResponse> GetLargeCompany(Guid id, CancellationToken cancellationToken)
        {
            var company = await _companyRepo.GetLargeCompany(id, cancellationToken);
            if (company is null)
                return null;
            return CompanyMapper.ToLarge(company);
        }

        public async Task<GetAllCompaniesResponse> GetAllCompanies(GetAllCompaniesRequest request, CancellationToken cancellationToken)
        {
            var companies = await _companyRepo.GetAllCompanies(request, cancellationToken);


            var pageInfo =
            new PageResponse
            {
                Page = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : companies.Count(),
                TotalItems = companies.Count(),
                TotalPages = request.Pagination != null ? (companies.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
                companies = companies.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);

            var list = companies.Select(x => CompanyMapper.ToDTO(x)).ToList();
            return new GetAllCompaniesResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }

        public async Task<GetAllShortCompaniesResponse> GetAllShortCompanies(GetAllCompaniesRequest request, CancellationToken cancellationToken)
        {
            var companies = await _companyRepo.GetAllShortCompanies(request, cancellationToken);


            var pageInfo =
            new PageResponse
            {
                Page = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : companies.Count(),
                TotalItems = companies.Count(),
                TotalPages = request.Pagination != null ? (companies.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
                companies = companies.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);

            var list = companies.Select(x => CompanyMapper.ToShort(x)).ToList();
            return new GetAllShortCompaniesResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
    }
}
