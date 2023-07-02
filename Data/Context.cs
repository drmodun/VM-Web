using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }
        public DbSet<Models.Service> Services => Set<Models.Service>();
        public DbSet<Models.Order> Orders => Set<Models.Order>();
        public DbSet<Models.Company> Companies => Set<Models.Company>();
        public DbSet<Models.PreviousClient> PreviousClients => Set<Models.PreviousClient>();
        public DbSet<Models.Product> Products => Set<Models.Product>();
        public DbSet<Models.User> Users => Set<Models.User>();
        public DbSet<Models.Category> Categories => Set<Models.Category>();
        public DbSet<Models.Subcategory> Subcategories => Set<Models.Subcategory>();

        public DbSet<Models.Transaction> Transacitons => Set<Models.Transaction>();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Database=vm;Username=postgres;Password=drmodunV9");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .HasMany(x => x.Subcategories)
                .WithOne(o => o.Category)
                .HasForeignKey(o => o.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Category>()
                .HasMany(x => x.Products)
                .WithOne(o => o.Category)
                .HasForeignKey(o => o.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Subcategory>()
                .HasMany(x => x.Products)
                .WithOne(o => o.Subcategory)
                .HasForeignKey(o => o.SubCategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Company>()
                .HasMany(x => x.Products)
                .WithOne(o => o.Company)
                .HasForeignKey(o => o.CompanyId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .HasMany(x => x.Transactions)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<User>()
                .HasMany(x => x.Orders)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder
                .Entity<Product>()
                .HasMany(x => x.Transactions)
                .WithOne(o => o.Product)
                .HasForeignKey(o => o.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Service>()
                .HasMany(x => x.Orders)
                .WithOne(o => o.Service)
                .HasForeignKey(o => o.ServiceId)
                .OnDelete(DeleteBehavior.Cascade);
            //handle conversions later  



            base.OnModelCreating(modelBuilder);

        }




    }
}