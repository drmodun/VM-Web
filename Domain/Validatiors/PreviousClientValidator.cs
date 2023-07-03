using Data.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Domain.Validatiors
{
    public class PreviousClientValidator : AbstractValidator<PreviousClient>
    {
        public PreviousClientValidator() 
        {

            var websiteCheck = new Regex(@"[-a-zA-Z0-9@:%._\+~#=]{1,256}\
            .[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)");
            RuleFor(x=>x.Name).Must(x=>x.Length <= 50 && x.Length > 4).WithMessage("Name of client must be between 5 and 50 chaarcters");
            RuleFor(x=>x.Description).Must(x=>x.Length <= 50 && x.Length > 4).WithMessage("Description of client must be between 5 and 50 chaarcters");
            RuleFor(x => x.Website).Must(x => { return websiteCheck.IsMatch(x);});
            RuleFor(x => x.Rating).Must(x => x < 11 && x > 0).WithMessage("Rating must be a valid value");

        }
    }
}
