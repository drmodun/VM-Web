using Contracts.Requests.Subcategory;
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

        public async Task<bool> CreateSubcategory(CreateSubcategoryRequest request, CancellationToken cancellationToken)
        {
            var subcategory = _subcategoryMapper.ToEntity(request);
            return await _subcategoryRepo.CreateSubcategory(subcategory, cancellationToken);
        }

        public async Task<bool> UpdateSubcategory(PutSubcategoryRequest request, CancellationToken cancellationToken)
        {
            var subcategory = _subcategoryMapper.ToUpdated(request);
            return await _subcategoryRepo.UpdateSubcategory(subcategory, cancellationToken);
        }

        public async Task<bool> DeleteSubcategory(Guid id, CancellationToken cancellationToken)
        {
            return await _subcategoryRepo.DeleteSubcategory(id, cancellationToken);
        }

        public async Task<GetSubcategoryResponse?> GetSubcategory(Guid id, CancellationToken cancellationToken)
        {
            var subcategory = await _subcategoryRepo.GetSubcategory(id, cancellationToken);
            if (subcategory is null)
                return null;
            return _subcategoryMapper.ToDTO(subcategory);
        }

        public async Task<List<GetSubcategoryResponse>> GetAllSubcategories(GetAllSubcategoriesRequest request, CancellationToken cancellationToken)
        {
            var subcategorys = await _subcategoryRepo.GetAllSubcategories(request, cancellationToken);
            return subcategorys.Select(x => _subcategoryMapper.ToDTO(x)).ToList();
        }
    }
}
