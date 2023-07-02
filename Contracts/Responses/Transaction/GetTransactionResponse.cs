using Data.Enums;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Transaction
{
    public class GetTransactionResponse
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }

        public string UserName { get; set; }
        public string ProductName { get; set; }
        public DateTime CreatedAt { get; set; }

        public TransactionType TransactionType { get; set; }
    }
}
