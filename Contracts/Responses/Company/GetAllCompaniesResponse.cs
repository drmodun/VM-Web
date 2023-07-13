namespace Contracts.Responses.Company
{
    public class GetAllCompaniesResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetCompanyResponse> Items { get; set; }
    }
}
