using Data.Models;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Domain.Validatiors
{
    public class CompanyValidator : AbstractValidator<Company>
    {
        public CompanyValidator()
        {
            var websiteCheck = new Regex(@"[-a-zA-Z0-9@:%._\+~#=]{1,256}\
            .[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)");
            var base64Check = new Regex(@"^(?:[A-Za-z0-9+/]{4})*
            (?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$");

            RuleFor(x => x.Name).Must(x => x.Length <= 50 && x.Length > 4).WithMessage("Name of category must be between 5 and 50 chaarcters");
            RuleFor(x => x.Description).Must(x => x.Length <= 100 && x.Length > 10).WithMessage("Descciption of category must be between 10 and 100 chaarcters");
            RuleFor(x => x.Website).Must(x => { return websiteCheck.IsMatch(x); });
            RuleFor(x => x.Logo).Must(x => base64Check.IsMatch(x));
        }

    }
}
