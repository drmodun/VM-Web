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
                .UseNpgsql("Host=ep-damp-feather-77564992.eu-central-1.aws.neon.tech;Database=neondb;Username=drmodun;Password=jduyNOaYmA85")
                .Options;

            return new Context(options);
        }
    }
}
