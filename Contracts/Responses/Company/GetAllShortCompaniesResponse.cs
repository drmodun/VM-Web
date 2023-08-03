namespace Contracts.Responses.Company
{
    public class GetAllShortCompaniesResponse
    {
        public List<GetShortCompany> Items { get; set; }
        public PageResponse? PageInfo { get; set; }
    }
}
