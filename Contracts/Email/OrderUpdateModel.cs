using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Email
{
    public class OrderUpdateModel
    {
        public string ServiceName { get; set; }
        public string UserName { get; set; }
        public string Status { get; set; }
        public string Link { get; set; }
        public string? Note { get; set; }
    }
}
