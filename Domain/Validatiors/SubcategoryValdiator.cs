using Data;
using Data.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Validatiors
{
    public class SubcategoryValdiator : AbstractValidator<Subcategory>
    {
        private readonly Context _context;
        public SubcategoryValdiator(Context context) 
        {
            _context = context;
            RuleFor(x => x.Name).Must(x => x.Length <= 50 && x.Length > 4).WithMessage("Name of subcategory must be between 5 and 50 chaarcters");
            RuleFor(x => x.Description).Must(x => x.Length <= 100 && x.Length > 10).WithMessage("Descciption of subcategory must be between 10 and 100 chaarcters");
            RuleFor(x => x.SubSchema).Must((x) =>
            {
                var check = true;
                foreach (var item in x)
                {
                    if (item.Value != "required" && item.Value != "optional")
                    {
                        check = !check;
                        break;
                    }
                }
                return check;
            });
            RuleFor(x => x.CategoryId).MustAsync(async (x, cancellationtoken) =>
            {
                return await _context.Subcategories.AnyAsync(b => b.Id == x, cancellationtoken);
            });
        }
    }
}
