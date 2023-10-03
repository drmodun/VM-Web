namespace Contracts.Responses.Company
{
    public class GetShortCompany
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Website { get; set; }
        public int NumberOfProducts { get; set; }
    }
}
