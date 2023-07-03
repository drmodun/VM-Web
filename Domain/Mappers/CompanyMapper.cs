using Contracts.Requests.Company;
using Contracts.Responses.Company;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Mappers
{
    public class CompanyMapper
    {
        public GetCompanyResponse ToDTO(Company company)
        {
            return new GetCompanyResponse
            {
                Id = company.Id,
                Description = company.Description,
                Logo = company.Logo,
                Website = company.Website,
                Name = company.Name,

            };
        }
        public Company ToEntity(CreateCompanyRequest request)
        {
            return new Company
            {
                Name = request.Name,
                Description = request.Description,
                Logo = request.Logo,
                Website = request.Website,
                Id = Guid.NewGuid()
            };
        }


    }
}
