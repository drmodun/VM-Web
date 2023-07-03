using Data.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Validatiors
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        public CategoryValidator() 
        {
            RuleFor(x => x.Name).Must(x => x.Length <= 50 && x.Length > 4).WithMessage("Name of category must be between 5 and 50 chaarcters");
            RuleFor(x=>x.Description).Must(x => x.Length <= 100 && x.Length > 10).WithMessage("Description of category must be between 10 and 100 chaarcters");
            RuleFor(x => x.Schema).Must((x) =>
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
        }


    }
}
