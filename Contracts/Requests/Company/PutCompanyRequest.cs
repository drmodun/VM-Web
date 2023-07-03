﻿namespace Contracts.Requests.Company
{
    public class PutCompanyRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }

        public string Website { get; set; }

    }
}
