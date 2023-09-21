using Contracts.Requests.Company;
using Contracts.Responses.Company;
using Data.Models;

namespace Domain.Mappers
{
    public static class CompanyMapper
    {
        public static GetCompanyResponse ToDTO(Company company)
        {
            return new GetCompanyResponse
            {
                Id = company.Id,
                Description = company.Description,
                Website = company.Website,
                Name = company.Name,

            };
        }
        public static GetShortCompany ToShort(Company company)
        {
            return new GetShortCompany
            {
                Id = company.Id,
                NumberOfProducts = company.Products.Count,
                Name = company.Name,
                Website = company.Website
            };
        }
        public static Company ToEntity(CreateCompanyRequest request)
        {
            return new Company
            {
                Name = request.Name,
                Description = request.Description,
                Website = request.Website,
                Id = Guid.NewGuid()
            };
        }

        public static GetLargeCompanyResponse ToLarge(Company company)
        {
            return new GetLargeCompanyResponse
            {
                Id = company.Id,
                Name = company.Name,
                Categories = company.Products.DistinctBy(x => x.Category).Select(x => CategoryMapper.ToShort(x.Category)).ToList(),
                Description = company.Description,
                Subcategories = company.Products.DistinctBy(x => x.Subcategory).Select(x => SubcategoryMapper.ToShort(x.Subcategory)).ToList()

            };

        }

        public static Company ToUpdated(PutCompanyRequest request)
        {
            return new Company
            {
                Name = request.Name,
                Description = request.Description,
                Website = request.Website,
                Id = request.Id
            };
        }
    }
}
