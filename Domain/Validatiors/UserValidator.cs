﻿using Data.Models;
using FluentValidation;
using System.Text.RegularExpressions;

namespace Domain.Validatiors
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            var emailCheck = new Regex(@"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
            var phoneNumberCheck = new Regex(@"^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");

            //most likely a similar check will be on the fronetned too, but it is better to be safe

            RuleFor(x => x.Name).Must(x => x.Length > 3 && x.Length < 50)
                .WithMessage("Username muste be between 3 and 50 characters long");
            RuleFor(x => x.Email).Must(x => emailCheck.IsMatch(x));
            //check this later
            RuleFor(x => x.Address).Must(x => x is null || x.Length > 5 && x.Length < 50).WithMessage("Address must be between 5 and 50 characters long");

            //password check will be in services most likely, because hash values always pass the regex for it

            RuleFor(x => x.PhoneNumber).Must(x => x is null || phoneNumberCheck.IsMatch(x));
        }
    }
}