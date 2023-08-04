using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options) { }
        public DbSet<Service> Services => Set<Service>();
        public DbSet<Order> Orders => Set<Order>();
        public DbSet<Company> Companies => Set<Company>();
        public DbSet<PreviousClient> PreviousClients => Set<PreviousClient>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Subcategory> Subcategories => Set<Subcategory>();

        public DbSet<Transaction> Transactions => Set<Transaction>();

        public DbSet<Cart> Carts => Set<Cart>();

        public DbSet<CartsProducts> CartsProducts => Set<CartsProducts>();


        public DbSet<Favourites> Favourites => Set<Favourites>();


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Database=vm;Username=postgres;Password=postgres");
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

            modelBuilder.Entity<User>()
                .HasOne(x => x.Cart)
                .WithOne(o => o.User)
                .HasForeignKey<Cart>(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(x => x.Favourites)
                .WithOne(o => o.User)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Favourites>()
                .HasOne(x => x.Product)
                .WithMany(o => o.Favourites)
                .HasForeignKey(o => o.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Favourites>()
                .HasKey(o => new { o.ProductId, o.UserId });

            modelBuilder.Entity<CartsProducts>()
                .HasKey(o => new { o.ProductId, o.CartId });

            modelBuilder.Entity<CartsProducts>()
                .HasOne(x => x.Cart)
                .WithMany(o => o.CartsProducts)
                .HasForeignKey(o => o.CartId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<CartsProducts>()
                .HasOne(x => x.Product)
                .WithMany(o => o.CartsProducts)
                .HasForeignKey(o => o.ProductId)
                .OnDelete(DeleteBehavior.Cascade);


            //handle conversions later  







            base.OnModelCreating(modelBuilder);

        }




    }
}