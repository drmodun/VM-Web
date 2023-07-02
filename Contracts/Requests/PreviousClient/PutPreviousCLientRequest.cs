namespace Contracts.Requests.PreviousClients
{
    public class PutPreviousCLientRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Website { get; set; }
        public string Image { get; set; }
        public int? Rating { get; set; }


    }
}
