using Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests
{
    public class SortRequest
    {
        //this makes it possible to sort by multiple criteria, but it will always be ba this order
        public SortType? SortByName { get; set; }

        public SortType? SortByDate { get; set; }

        public SortType? SortByQuantity { get; set; }

        public SortType? SortByPrice { get; set; }

        public SortType? SortByDeadline { get; set; }

        public SortType? SortByTotalSold { get; set; }

        public SortType? SortByNumberOfPurchases { get; set; }
        public SortType? SortByAddress { get; set; }

        public SortType? SortByType { get; set; }

    }
}
