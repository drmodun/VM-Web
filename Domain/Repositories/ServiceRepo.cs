using Contracts.Requests;
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

        public async Task<bool> CreateService(Service service, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(service);
            await _context.Services.AddAsync(service);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> UpdateService(Service service, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(service, cancellationToken);
            _context.Services.Update(service);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteService(Guid id, CancellationToken cancellationToken)
        {
            var serviceToDelete = await _context.Services.FindAsync(id, cancellationToken);
            _context.Services.Remove(serviceToDelete);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<Service?> GetService(Guid id, CancellationToken cancellationToken)
        {
            return await _context.Services.FirstOrDefaultAsync(b => b.Id == id, cancellationToken);
        }

        public async Task<List<Service>> GetAllServices(GetAllServicesRequest request, CancellationToken cancellationToken)
        {
            var services = _context.Services
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.MinPrice == null || x.Price >= request.MinPrice)
                .Where(x => request.MaxPrice == null || x.Price < request.MaxPrice);
            //it makes sense to order by type for default
            if (request.Sorting == null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            services = services.OrderBy(x => x.Name);
                        else
                            services = services.OrderByDescending(x => x.Name);
                        break;
                    case SortAttributeType.SortByPrice:
                        if (request.Sorting.SortType == SortType.Ascending)
                            services = services.OrderBy(x => x.Price);
                        else
                            services = services.OrderByDescending(x => x.Price);
                        break;
                    case SortAttributeType.SortByTotalSold:
                        if (request.Sorting.SortType == SortType.Ascending)
                            services = services.OrderBy(x => x.Orders.Count);
                        else
                            services = services.OrderByDescending(x => x.Orders.Count);
                        break;
                    default: break;
                }
            }
            if (request.Pagination != null)
            {
                services = services.Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageSize).Take(request.Pagination.PageSize);
            }

            return await services.ToListAsync(cancellationToken);
        }
    }
}
