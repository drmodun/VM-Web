using Contracts.Requests.Company;
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

        public async Task<bool> CreateCompany(CreateCompanyRequest request, CancellationToken cancellationToken)
        {
            var company = _companyMapper.ToEntity(request);
            return await _companyRepo.CreateCompany(company, cancellationToken);
        }

        public async Task<bool> UpdateCompany(PutCompanyRequest request, CancellationToken cancellationToken)
        {
            var company = _companyMapper.ToUpdated(request);
            return await _companyRepo.UpdateCompany(company, cancellationToken);
        }

        public async Task<bool> DeleteCompany(Guid id, CancellationToken cancellationToken)
        {
            return await _companyRepo.DeleteCompany(id, cancellationToken);
        }

        public async Task<GetCompanyResponse?> GetCompany(Guid id, CancellationToken cancellationToken)
        {
            var company = await _companyRepo.GetCompany(id, cancellationToken);
            if (company is null)
                return null;
            return _companyMapper.ToDTO(company);
        }

        public async Task<List<GetCompanyResponse>> GetAllCompanys(GetAllCompaniesRequest request, CancellationToken cancellationToken)
        {
            var companies = await _companyRepo.GetAllcompanies(request, cancellationToken);
            return companies.Select(x => _companyMapper.ToDTO(x)).ToList();
        }
    }
}
