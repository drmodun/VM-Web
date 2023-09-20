using Data;
using Data.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Domain.Validatiors
{
    public class SubcategoryValidator : AbstractValidator<Subcategory>
    {
        private readonly Context _context;
        public SubcategoryValidator(Context context)
        {
            _context = context;
            RuleFor(x => x.Name).Must(x => x.Length <= 50 && x.Length > 4).WithMessage("Name of subcategory must be between 5 and 50 chaarcters");
            RuleFor(x => x.Description).Must(x => x.Length <= 100 && x.Length > 10).WithMessage("Description of subcategory must be between 10 and 100 chaarcters");
            RuleFor(x => x.CategoryId).MustAsync(async (x, cancellationtoken) =>
            {
                return await _context.Categories.AnyAsync(b => b.Id == x, cancellationtoken);
            }).WithMessage("Category with this id does not exist");
        }
    }
}
