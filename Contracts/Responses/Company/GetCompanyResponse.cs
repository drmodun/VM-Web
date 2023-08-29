namespace Contracts.Responses.Company
{
    public class GetCompanyResponse
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public Guid Id { get; set; }

        public string Website { get; set; }
        //make my mind about pagination here

    }
}
