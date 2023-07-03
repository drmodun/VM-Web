using Data.Models;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Domain.Validatiors
{
    public class PreviousClientValidator : AbstractValidator<PreviousClient>
    {
        public PreviousClientValidator()
        {

            var websiteCheck = new Regex(@"[-a-zA-Z0-9@:%._\+~#=]{1,256}\
            .[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)");
            var base64Check = new Regex(@"^(?:[A-Za-z0-9+/]{4})*
            (?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$");

            RuleFor(x => x.Name).Must(x => x.Length <= 50 && x.Length > 4).WithMessage("Name of client must be between 5 and 50 chaarcters");
            RuleFor(x => x.Description).Must(x => x.Length <= 50 && x.Length > 4).WithMessage("Description of client must be between 5 and 50 chaarcters");
            RuleFor(x => x.Website).Must(x => { return websiteCheck.IsMatch(x); });
            RuleFor(x => x.Rating).Must(x => x < 11 && x > 0).WithMessage("Rating must be a valid value");
            RuleFor(x =>x.Image).Must ( x=>base64Check.IsMatch(x));

        }
    }
}
