using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class DbContextFactory : IDesignTimeDbContextFactory<Context>
    {
        public Context CreateDbContext(string[] args)
        {

            var options = new DbContextOptionsBuilder<Context>()
                .EnableSensitiveDataLogging(true)
                .UseNpgsql(
                    "Host=localhost;Database=vm;Username=postgres;Password=drmodunV9"
                )
                .Options;

            return new Context(options);
        }
    }
}
