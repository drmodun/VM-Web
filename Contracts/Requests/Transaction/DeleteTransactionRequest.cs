using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.Transaction
{
    public class DeleteTransactionRequest
    {
        public Guid Id { get; set; }
    }
}
