using Contracts.Requests.User;
using Contracts.Responses.Order;
using Contracts.Responses.Transaction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.User
{
    public class GetMeResponse
    {
        public GetUserResponse User { get; set; }

        public int TransactionCount { get; set; }

        public int OrderCount { get; set; }

        public decimal TotalSpent { get; set; }

        public List<GetOrderResponse> Orders { get; set; }
        public List<GetTransactionResponse> Transactions { get; set; }



    }
}
