using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Requests.PreviousClients
{
    public class GetAllPreviousClientsRequest
    {
        public string ? Name { get; set; }
        public string ? Description { get; set; }
        public int ? MinRating { get; set; }
    }
}
