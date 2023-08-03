using Contracts.Requests.Category;
using Contracts.Responses;
using Contracts.Responses.Category;
using Domain.Mappers;
using Domain.Repositories;
using System.Security.Cryptography.X509Certificates;

namespace Domain.Services
{
    public class CategoryService
    {
        private readonly CategoryRepo _categoryRepo;

        public CategoryService(CategoryRepo categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }

        public async Task<CreateCategoryResponse> CreateCategory(CreateCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = CategoryMapper.ToEntity(request);
            var action = await _categoryRepo.CreateCategory(category, cancellationToken);
            return new CreateCategoryResponse
            {
                Success = action
            };
        }

        public async Task<PutCategoryResponse> UpdateCategory(PutCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = CategoryMapper.ToUpdated(request);
            var action = await _categoryRepo.UpdateCategory(category, cancellationToken);
            return new PutCategoryResponse
            {
                Success = action
            };
        }

        public async Task<DeleteCategoryResponse> DeleteCategory(Guid id, CancellationToken cancellationToken)
        {
            var action = await _categoryRepo.DeleteCategory(id, cancellationToken);
            return new DeleteCategoryResponse
            {
                Success = action
            };

        }

        public async Task<GetCategoryResponse?> GetCategory(Guid id, CancellationToken cancellationToken)
        {
            var category = await _categoryRepo.GetCategory(id, cancellationToken);
            if (category is null)
                return null;
            return CategoryMapper.ToDTO(category);
        }

        public async Task<GetAllCategoriesResponse> GetAllCategories(GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            var categories = await _categoryRepo.GetAllCategories(request, cancellationToken);
            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : categories.Count(),
                TotalItems = categories.Count(),
                TotalPages = request.Pagination != null ? (categories.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
                categories = categories.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);

            var list = categories.Select(x => CategoryMapper.ToDTO(x)).ToList();
            return new GetAllCategoriesResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
        public async Task<GetShortCategoriesResponse> GetAllShortCategories(GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            var categories = await _categoryRepo.GetAllCategories(request, cancellationToken);
            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : categories.Count(),
                TotalItems = categories.Count(),
                TotalPages = request.Pagination != null ? (categories.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
                categories = categories.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            var list = categories.Select(CategoryMapper.ToShort).ToList();
            return new GetShortCategoriesResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
        public async Task<GetLargeCategoryResponse?> GetLargeCategory(Guid id, CancellationToken cancellationToken)
        {
            var category = await _categoryRepo.GetLargeCategory(id, cancellationToken);
            if (category == null)
                return null;
            return CategoryMapper.ToLarge(category);
        }
    }
}
