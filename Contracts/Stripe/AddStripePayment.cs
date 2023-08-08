using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Stripe
{
    public class AddStripePayment
    {
        public Guid UserId;
        public string ReceiptEmail { get; set;}
        public string Description { get; set;}
    }
}
