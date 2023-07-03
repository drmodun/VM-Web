using Data.Models;
using FluentValidation;

namespace Domain.Validatiors
{
    public class ServiceValidator : AbstractValidator<Service>
    {
        public ServiceValidator()
        {
            RuleFor(x => x.Name).Must(x => x.Length <= 50 && x.Length > 4).WithMessage("Name of service must be between 5 and 50 chaarcters");
            RuleFor(x => x.Description).Must(x => x.Length <= 100 && x.Length > 10).WithMessage("Description of service must be between 10 and 100 chaarcters");
            RuleFor(x => x.Price).Must(x => x >= 1 && x <= 100000).WithMessage("Price must be reasonable");
        }

    }
}
