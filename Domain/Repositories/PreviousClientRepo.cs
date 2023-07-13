﻿using Contracts.Requests;
using Contracts.Requests.PreviousClients;
using Data;
using Data.Enums;
using Data.Models;
using Domain.Validatiors;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Repositories
{
    public class PreviousClientRepo
    {
        private readonly Context _context;
        private readonly PreviousClientValidator _validator;
        public PreviousClientRepo(Context context, PreviousClientValidator validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<bool> CreatePreviousClient(PreviousClient previousClient, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(previousClient, cancellationToken);
            await _context.PreviousClients.AddAsync(previousClient, cancellationToken);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> UpdatePreviousClient(PreviousClient previousClient, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(previousClient, cancellationToken);
            _context.PreviousClients.Update(previousClient);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeletePreviousClient(Guid id, CancellationToken cancellationToken)
        {
            var previousClient = await _context.PreviousClients.FindAsync(id, cancellationToken);
            if (previousClient == null) { return false; }
            _context.PreviousClients.Remove(previousClient);
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<PreviousClient?> GetPreviousClient(Guid id, CancellationToken cancellationToken)
        {
            return await _context.PreviousClients.FindAsync(id, cancellationToken);
        }

        public async Task<List<PreviousClient>> GetAllpreviousClients(GetAllPreviousClientsRequest request, CancellationToken cancellationToken)
        {
            var previousClients = _context.PreviousClients
                .Where(x => request.Name == null || x.Name.Contains(request.Name))
                .Where(x => request.Description == null || x.Description.Contains(request.Description))
;
            //sorting
            //possibly later change logic of sorting to be more dynamic

            if (request.Sorting != null)
            {
                switch (request.Sorting.Attribute)
                {
                    case SortAttributeType.SortByName:
                        if (request.Sorting.SortType == SortType.Ascending)
                            previousClients.OrderBy(x => x.Name);
                        else
                            previousClients.OrderByDescending(x => x.Name);
                        break;
                 
                    default: break;
                }
            }

            if (request.Pagination != null)
            {
                previousClients.Skip((request.Pagination.PageNumber - 1) * request.Pagination.PageNumber);
                previousClients.Take(request.Pagination.PageSize);
            }
            return await previousClients.ToListAsync(cancellationToken);


        }
    }
}
