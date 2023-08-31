using Azure.Storage.Blobs;
using Data;
using Domain.Repositories;
using Domain.Services;
using Domain.Validatiors;
using Email;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Stripe;

namespace Domain
{
    public static class ApplicationServiceExtensionCollection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            EmailSender.ApiKey = configuration.GetValue<string>("SendGrid:Key");
            StripeConfiguration.ApiKey = configuration.GetValue<string>("Stripe:SecretKey");
            services.AddDbContext<Context>(options => options.UseNpgsql("Host=localhost;Database=vm;Username=postgres;Password=postgres"));
            //gonna hardcode this for now but later this will be editable
            services.AddScoped<CompanyRepo>();
            services.AddScoped<BlobService>();
            services.Configure<Microsoft.AspNetCore.Mvc.Razor.RazorViewEngineOptions>(o => {
                o.ViewLocationFormats.Add("/Email/Views/{0}" + Microsoft.AspNetCore.Mvc.Razor.RazorViewEngine.ViewExtension);
            });
            services.AddRazorPages();
            services.AddScoped<ProductRepo>();
            services.AddScoped<RazorViewToStringRenderer>();
            services.AddScoped<OrderRepo>();
            services.AddScoped<TransactionRepo>();
            services.AddScoped<UserRepo>();
            services.AddScoped<FavouritesRepo>();
            services.AddScoped<PreviousClientRepo>();
            services.AddScoped<ServiceRepo>();
            services.AddHttpContextAccessor();
            services.AddScoped<SubcategoryRepo>();
            services.AddScoped<CartRepo>();
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
            services.AddScoped<Services.ProductService>();
            services.AddScoped<OrderService>();
            services.AddScoped<CartService>();
            services.AddScoped<TransactionService>();
            services.AddScoped<UserService>();
            services.AddScoped<PreviousClientService>();
            services.AddScoped<ServiceService>();
            services.AddScoped<SubcategoryService>();
            services.AddScoped<CategoryService>();
            services.AddScoped<IdentityService>();

            services.AddScoped<StripeAppService>();
            services.AddScoped<CustomerService>();
            services.AddScoped<ChargeService>();
            services.AddScoped<TokenService>();

            //later maybe use interfaces but it will be easier now
            return services;
        }


    }
}