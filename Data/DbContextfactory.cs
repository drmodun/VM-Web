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
                .UseNpgsql()
                .Options;

            return new Context(options);
        }
    }
}
