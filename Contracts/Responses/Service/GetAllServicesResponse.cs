﻿namespace Contracts.Responses.Service
{
    public class GetAllServicesResponse
    {
        public PageResponse? PageInfo { get; set; }
        public List<GetServiceResponse> Items { get; set; }
    }
}
