using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Data
{
    public class DbContextFactory : IDesignTimeDbContextFactory<Context>
    {
        public Context CreateDbContext(string[] args)
        {

            var options = new DbContextOptionsBuilder<Context>()
                .EnableSensitiveDataLogging(true)
                .UseNpgsql(
                    "Host=localhost;Database=vm;Username=postgres;Password=postgres"
                )
                .Options;

            return new Context(options);
        }
    }
}
