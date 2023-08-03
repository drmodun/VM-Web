using Data;
using Domain.Mappers;
using Domain.Repositories;
using Domain.Services;
using Domain.Validatiors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Domain
{
    public static class ApplicationServiceExtensionCollection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddDbContext<Context>(options => options.UseNpgsql("Host=localhost;Database=vm;Username=postgres;Password=postgres"));
            //gonna hardcode this for now but later this will be editable
            services.AddScoped<CompanyRepo>();
            services.AddScoped<ProductRepo>();
            services.AddScoped<OrderRepo>();
            services.AddScoped<TransactionRepo>();
            services.AddScoped<UserRepo>();
            services.AddScoped<FavouritesRepo>();
            services.AddScoped<PreviousClientRepo>();
            services.AddScoped<ServiceRepo>();
            services.AddScoped<SubcategoryRepo>();
            services.AddScoped<CategoryRepo>();

            services.AddScoped<CompanyValidator>();
            services.AddScoped<ProductValidator>();
            services.AddScoped<OrderValidator>();
            services.AddScoped<TransactionValidator>();
            services.AddScoped<UserValidator>();
            services.AddScoped<PreviousClientValidator>();
            services.AddScoped<ServiceValidator>();
            services.AddScoped<SubcategoryValidator>();
            services.AddScoped<CategoryValidator>();


            services.AddScoped<CompanyService>();
            services.AddScoped<ProductService>();
            services.AddScoped<OrderService>();
            services.AddScoped<TransactionService>();
            services.AddScoped<UserService>();
            services.AddScoped<PreviousClientService>();
            services.AddScoped<ServiceService>();
            services.AddScoped<SubcategoryService>();
            services.AddScoped<CategoryService>();
            services.AddScoped<IdentityService>();
            //later maybe use interfaces but it will be easier now
            //validation seems to be broken but still works
            return services;
        }


    }
}