namespace Contracts.Responses.User
{
    public class GetAllUsersResponse
    {
        public PageResponse PageInfo { get; set; }
        public List<GetAllUsersResponse> Users { get; set; }
    }
}
