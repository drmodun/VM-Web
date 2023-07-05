using Contracts.Requests.Category;
using Contracts.Responses;
using Contracts.Responses.Category;
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

        public async Task<CreateCategoryResponse> CreateCategory(CreateCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = _categoryMapper.ToEntity(request);
            var action = await _categoryRepo.CreateCategory(category, cancellationToken);
            return new CreateCategoryResponse
            {
                Success = action
            };
        }

        public async Task<PutCategoryResponse> UpdateCategory(PutCategoryRequest request, CancellationToken cancellationToken)
        {
            var category = _categoryMapper.ToUpdated(request);
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
