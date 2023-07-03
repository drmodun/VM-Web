using Data;
using Data.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Validatiors
{
    public class TransactionValidator : AbstractValidator<Transaction>
    {
        private readonly Context _context;

        public TransactionValidator(Context context)
        {
            _context = context;

            RuleFor(x => new { x.ProductId, x.Quantity }).MustAsync(async (x, cancellationtoken) =>
            {
                var product = await _context.Products.FirstOrDefaultAsync(b => b.Id == x.ProductId, cancellationtoken);
                return product.Quantity >= x.Quantity && x.Quantity > 0;
            }).WithMessage("Product must be valid and quality must be above 0 and must be less than the quantity of the product");

            RuleFor(x => x.UserId).MustAsync(async (x, cancellationToken) =>
            {
                return await _context.Users.AnyAsync(b => b.Id == x, cancellationToken);
            }).WithMessage("User must be valid");



        }
    }
}
