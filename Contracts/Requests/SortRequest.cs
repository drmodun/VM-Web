using Data.Enums;

namespace Contracts.Requests
{
    public class SortRequest
    {
        public SortAttributeType Attribute { get; set; }
        //public SortAttributeType? Secondary { get; set;} 
        //might add second criteria later but now it is just a pain
        public SortType SortType { get; set; }  

    }
}
