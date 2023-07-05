using Contracts.Requests.Subcategory;
using Contracts.Responses;
using Contracts.Responses.Subcategory;
using Domain.Mappers;
using Domain.Repositories;

namespace Domain.Services
{
    public class SubcategoryService
    {
        private readonly SubcategoryRepo _subcategoryRepo;
        private readonly SubcategoryMapper _subcategoryMapper;

        public SubcategoryService(SubcategoryRepo subcategoryRepo, SubcategoryMapper subcategoryMapper)
        {
            _subcategoryRepo = subcategoryRepo;
            _subcategoryMapper = subcategoryMapper;
        }

        public async Task<CreateSubcategoryResponse> CreateSubcategory(CreateSubcategoryRequest request, CancellationToken cancellationToken)
        {
            var subcategory = _subcategoryMapper.ToEntity(request);
            var action = await _subcategoryRepo.CreateSubcategory(subcategory, cancellationToken);
            return new CreateSubcategoryResponse
            {
                Success = action
            };
        }

        public async Task<PutSubcategoryResponse> UpdateSubcategory(PutSubcategoryRequest request, CancellationToken cancellationToken)
        {
            var subcategory = _subcategoryMapper.ToUpdated(request);
            var action = await _subcategoryRepo.UpdateSubcategory(subcategory, cancellationToken);
            return new PutSubcategoryResponse
            {
                Success = action
            };
        }

        public async Task<DeleteSubcategoryResponse> DeleteSubcategory(Guid id, CancellationToken cancellationToken)
        {
            var action = await _subcategoryRepo.DeleteSubcategory(id, cancellationToken);
            return new DeleteSubcategoryResponse
            {
                Success = action
            };
        }

        public async Task<GetSubcategoryResponse?> GetSubcategory(Guid id, CancellationToken cancellationToken)
        {
            var subcategory = await _subcategoryRepo.GetSubcategory(id, cancellationToken);
            if (subcategory is null)
                return null;
            return _subcategoryMapper.ToDTO(subcategory);
        }

        public async Task<GetAllSubcategoriesResponse> GetAllSubcategories(GetAllSubcategoriesRequest request, CancellationToken cancellationToken)
        {
            var subcategories = await _subcategoryRepo.GetAllSubcategories(request, cancellationToken);
            var list = subcategories.Select(x => _subcategoryMapper.ToDTO(x)).ToList();


            var pageInfo = request.Pagination is null ? null
            : new PageResponse
            {
                PageNumber = request.Pagination.PageNumber,
                PageSize = request.Pagination.PageSize
            };
            return new GetAllSubcategoriesResponse
            {
                Subcategories = list,
                PageInfo = pageInfo
            };
        }
    }
}
