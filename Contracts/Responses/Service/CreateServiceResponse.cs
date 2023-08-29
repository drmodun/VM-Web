namespace Contracts.Responses.Service
{
    public class CreateServiceResponse
    {
        public bool Success { get; set; }
        public Guid? Id
        {
            get; set;
        }
    }
}
