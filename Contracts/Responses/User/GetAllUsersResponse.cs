using Contracts.Requests.User;

namespace Contracts.Responses.User
{
    public class GetAllUsersResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetUserResponse> Users { get; set; }
    }
}
