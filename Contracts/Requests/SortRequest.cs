using Data.Enums;

namespace Contracts.Requests
{
    public class SortRequest
    {
        public SortAttributeType Attribute { get; set; }
        //TODO: potentially add secondary filter
        public SortType SortType { get; set; }

    }
}
