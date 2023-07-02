using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.PreviousClient
{
    public class GetPreviousClientResponse
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string Website { get; set; }
        public Guid Id { get; set; }
        public int ? Rating { get; set; }
    }
}
