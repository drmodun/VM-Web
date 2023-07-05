using Contracts.Requests.Category;
using Contracts.Responses;
using Contracts.Responses.Category;
using Contracts.Responses.Product;
using Data.Models;
using Domain.Mappers;
using Domain.Repositories;

namespace Domain.Services
{
    public class CategoryService
    {
        private readonly CategoryRepo _categoryRepo;
        private readonly CategoryMapper _categoryMapper;

        public CategoryService(CategoryRepo categoryRepo, CategoryMapper categoryMapper)
        {
            _categoryRepo = categoryRepo;
            _categoryMapper = categoryMapper;
        }

        public async Task<bool> CreateCategory(CreateCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = _categoryMapper.ToEntity(request);
            return await _categoryRepo.CreateCategory(category, cancellationToken);
        }

        public async Task<bool> UpdateCategory(PutCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = _categoryMapper.ToUpdated(request);
            return await _categoryRepo.UpdateCategory(category, cancellationToken);
        }

        public async Task<bool> DeleteCategory(Guid id, CancellationToken cancellationToken)
        {
            return await _categoryRepo.DeleteCategory(id, cancellationToken);
        }

        public async Task<GetCategoryResponse?> GetCategory(Guid id, CancellationToken cancellationToken)
        {
            var category = await _categoryRepo.GetCategory(id, cancellationToken);
            if (category is null)
                return null;
            return _categoryMapper.ToDTO(category);
        }

        public async Task<GetAllCategoriesResponse> GetAllCategorys(GetAllCategoriesRequest request, CancellationToken cancellationToken)
        {
            var categories = await _categoryRepo.GetAllCategories(request, cancellationToken);
            var list = categories.Select(x => _categoryMapper.ToDTO(x)).ToList();


            var pageInfo = request.Pagination is null ? null
            : new PageResponse
            {
                PageNumber = request.Pagination.PageNumber,
                PageSize = request.Pagination.PageSize
            };
            return new GetAllCategoriesResponse
            {
                Categories = list,
                PageInfo = pageInfo
            };
        }
    }
}
