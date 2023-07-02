namespace Contracts.Requests.Company
{
    public class CreateCompanyRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }

        public string Website { get; set; }
    }
}
