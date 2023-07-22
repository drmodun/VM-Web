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
        private readonly CompanyMapper _companyMapper;

        public CompanyService(CompanyRepo companyRepo, CompanyMapper companyMapper)
        {
            _companyRepo = companyRepo;
            _companyMapper = companyMapper;
        }

        public async Task<CreateCompanyResponse> CreateCompany(CreateCompanyRequest request, CancellationToken cancellationToken)
        {
            var company = _companyMapper.ToEntity(request);
            var action = await _companyRepo.CreateCompany(company, cancellationToken);
            return new CreateCompanyResponse
            {
                Success = action
            };
        }

        public async Task<PutCompanyResponse> UpdateCompany(PutCompanyRequest request, CancellationToken cancellationToken)
        {
            var company = _companyMapper.ToUpdated(request);
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
            return _companyMapper.ToDTO(company);
        }

        public async Task<GetAllCompaniesResponse> GetAllCompanies(GetAllCompaniesRequest request, CancellationToken cancellationToken)
        {
            var companies = await _companyRepo.GetAllcompanies(request, cancellationToken);
            var list = companies.Select(x => _companyMapper.ToDTO(x)).ToList();


            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : list.Count,
                TotalItems = list.Count,
                TotalPages = request.Pagination != null ? (list.Count + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            return new GetAllCompaniesResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
    }
}
