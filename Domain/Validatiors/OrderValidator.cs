using Data;
using Data.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Validatiors
{
    public class OrderValidator : AbstractValidator<Order>
    {
        private readonly Context _context;

        public OrderValidator(Context context)
        {
            _context = context;

            RuleFor(x => x.ServiceId).MustAsync(async (x, cancellationtoken) =>
            {
                return await _context.Services.AnyAsync(b => b.Id == x, cancellationtoken);
            }).WithMessage("Service must be valid");

            RuleFor(x => x.UserId).MustAsync(async (x, cancellationtoken) =>
            {
                return await _context.Users.AnyAsync(b => b.Id == x, cancellationtoken);
            }).WithMessage("User must be valid");

            RuleFor(x => x.Deadline).Must(x => x is null || x > DateTime.UtcNow).WithMessage("Deadline must be in the future");



        }
    }
}
