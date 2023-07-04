using Contracts.Requests.Service;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class ServiceRepo
    {
        private readonly Context _context;
        private readonly ServiceValidator _validator;

        public ServiceRepo(Context context, ServiceValidator validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<bool> CreateService(Service service)
        {
            await _validator.ValidateAndThrowAsync(service);
            await _context.Services.AddAsync(service);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateService(Service service)
        {
            await _validator.ValidateAndThrowAsync(service);
            _context.Services.Update(service);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteService(Guid id)
        {
            var serviceToDelete = await _context.Services.FindAsync(id);
            _context.Services.Remove(serviceToDelete);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Service?> GetService(Guid id)
        {
            return await _context.Services.FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<List<Service>> GetAllServices(GetAllServicesRequest request, CancellationToken cancellationToken)
        {
            var services = _context.Services
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
                .Where(x => request.MaxPrice == null || x.Price < request.MaxPrice)
                .OrderBy(x => x.ServiceType);
            //it makes sense to order by type for default

            switch (request.Sorting.SortByName)
            {
                case SortType.Ascending:
                    services.ThenBy(x => x.Name);
                    break;
                case SortType.Descending:
                    services.ThenByDescending(x => x.Name);
                    break;
                default:
                    break;
            }

            switch (request.Sorting.SortByNumberOfPurchases)
            {
                case SortType.Ascending:
                    services.ThenBy(x => _context.Orders.Where(b => b.ServiceId == x.Id));
                    break;
                case SortType.Descending:
                    services.ThenByDescending(x => _context.Orders.Where(b => b.ServiceId == x.Id));
                    break;
                default: break;
            }

            if (request.Pagination != null)
            {
                services.Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageSize);
                services.Take(request.Pagination.PageSize);
            }

            return await services.ToListAsync();
        }
    }
}
