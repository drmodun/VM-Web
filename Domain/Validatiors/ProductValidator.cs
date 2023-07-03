using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Data;
using Data.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

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
            
            RuleFor(x => x.CategoryId).MustAsync(async (x, cancellationtoken) =>
            {
                return await _context.Categories.AnyAsync(b => b.Id == x, cancellationtoken);
            }).WithMessage("CategoryId must lead to a category");
            
            RuleFor(x => x.SubCategoryId).MustAsync(async (x, cancellationtoken) =>
            {
                return await _context.Subcategories.AnyAsync(b => b.Id == x, cancellationtoken);
            }).WithMessage("SubcategoryId must be valid");
            
            RuleFor(x => x.CompanyId).MustAsync(async (x, cancellationtoken) =>
            {
                return await _context.Companies.AnyAsync(b => b.Id == x);
            }).WithMessage("CompanyId must point ot a company");
            
            RuleFor(x => new { x.Attributes, x.SubAttributes, x.CategoryId, x.SubCategoryId})
                .MustAsync(async (x, cancellationtoken) =>
            {
                var document = x.Attributes;
                JsonElement root = document.RootElement;
                var categorySchema = _context.Categories
                .FirstOrDefaultAsync(b => b.Id == x.CategoryId).Result.Schema;

                foreach (var pair in categorySchema)
                {
                    JsonElement property;
                    //might add specific property checks based on string later
                    //for simplification reasons I will use strings as bools here
                    //and could possibly expand their use later
                    if (!root.TryGetProperty(pair.Key, out property) && pair.Value=="required")
                    {
                        return false;
                    };
                }

                //same thing for subcategory
                var subDocument = x.SubAttributes;
                JsonElement subRoot = subDocument.RootElement;
                var subCategorySchema = _context.Subcategories
                .FirstOrDefaultAsync(b => b.Id == x.SubCategoryId).Result.SubSchema;

                foreach (var pair in subCategorySchema)
                {
                    JsonElement property;
                    //might add specific property checks based on string later
                    //for simplification reasons I will use strings as bools here
                    //and could possibly expand their use later
                    if (!subRoot.TryGetProperty(pair.Key, out property) && pair.Value == "required")
                    {
                        return false;
                    };
                }

                //it hurts to write this definetly will do something else later
                return true;
            });

        }
    }
}
