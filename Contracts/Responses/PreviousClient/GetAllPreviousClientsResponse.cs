﻿namespace Contracts.Responses.PreviousClient
{
    public class GetAllPreviousClientsResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetPreviousClientResponse> Items { get; set; }
    }
}
