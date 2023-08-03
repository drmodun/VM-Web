﻿using Contracts.Requests.Company;
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
                Logo = company.Logo,
                Website = company.Website,
                Name = company.Name,

            };
        }
        public static GetShortCompany ToShort(Company company)
        {
            return new GetShortCompany
            {
                Id = company.Id,
                Logo = company.Logo,
                Name = company.Name,

            };
        }
        public static Company ToEntity(CreateCompanyRequest request)
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

        public static Company ToUpdated(PutCompanyRequest request)
        {
            return new Company
            {
                Name = request.Name,
                Description = request.Description,
                Logo = request.Logo,
                Website = request.Website,
                Id = request.Id
            };
        }
    }
}
