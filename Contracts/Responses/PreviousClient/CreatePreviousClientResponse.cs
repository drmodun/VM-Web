namespace Contracts.Responses.PreviousClient
{
    public class CreatePreviousClientResponse
    {
        public bool Success { get; set; }
        public Guid? Id
        {
            get; set;
        }
    }
}
