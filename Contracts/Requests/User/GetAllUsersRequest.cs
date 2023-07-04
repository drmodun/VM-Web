namespace Contracts.Requests.User
{
    public class GetAllUsersRequest
    {
        public string? Name { get; set; } 
        public SortRequest? Sorting { get; set;} 
        public PageRequest? Pagination { get; set; }
        public string? Email { get; set; }

        public string? Address { get; set; }
    }
}

