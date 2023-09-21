using Data;
using Data.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Domain.Validatiors
{
    public class ProductValidator : AbstractValidator<Product>
    {
        private readonly Context _context;
        public ProductValidator(Context context)
        {
            _context = context;
            RuleFor(x => x.Name).MinimumLength(4).WithMessage("Product name must be 4 or more characters long");
            RuleFor(x => x.Name).MaximumLength(50).WithMessage("Product name cannot be longer than 50 characters");
            RuleFor(x => x.Description).MinimumLength(10).WithMessage("Product description must be 10 or more characters long");
            RuleFor(x => x.Description).MaximumLength(100).WithMessage("Product name cannot be longer than 100 characters");
            RuleFor(x => x.Id).NotEmpty().WithMessage("Product must have valid Id");

        }
    }
}
