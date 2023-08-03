using Contracts.Requests.Subcategory;
using Contracts.Responses;
using Contracts.Responses.Category;
using Contracts.Responses.Subcategory;
using Domain.Mappers;
using Domain.Repositories;

namespace Domain.Services
{
    public class SubcategoryService
    {
        private readonly SubcategoryRepo _subcategoryRepo;

        public SubcategoryService(SubcategoryRepo subcategoryRepo)
        {
            _subcategoryRepo = subcategoryRepo;
        }

        public async Task<CreateSubcategoryResponse> CreateSubcategory(CreateSubcategoryRequest request, CancellationToken cancellationToken)
        {
            var subcategory = SubcategoryMapper.ToEntity(request);
            var action = await _subcategoryRepo.CreateSubcategory(subcategory, cancellationToken);
            return new CreateSubcategoryResponse
            {
                Success = action
            };
        }

        public async Task<PutSubcategoryResponse> UpdateSubcategory(PutSubcategoryRequest request, CancellationToken cancellationToken)
        {
            var subcategory = SubcategoryMapper.ToUpdated(request);
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
            return SubcategoryMapper.ToDTO(subcategory);
        }

        public async Task<GetAllSubcategoriesResponse> GetAllSubcategories(GetAllSubcategoriesRequest request, CancellationToken cancellationToken)
        {
            var subcategories = await _subcategoryRepo.GetAllSubcategories(request, cancellationToken);


            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : subcategories.Count(),
                TotalItems = subcategories.Count(),
                TotalPages = request.Pagination != null ? (subcategories.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
                subcategories = subcategories.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            var list = subcategories.Select(x => SubcategoryMapper.ToDTO(x)).ToList();
            return new GetAllSubcategoriesResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }

        public async Task<GetLargeSubcategoryRssponse?> GetLargeSubcategory(Guid id, CancellationToken cancellationToken)
        {
            var subcategory = await _subcategoryRepo.GetLargeSubcategory(id, cancellationToken);
            if (subcategory == null)
                return null;
            return SubcategoryMapper.ToLarge(subcategory);
        }
        public async Task<GetShortSubcategoriesResponse> GetShortSubcategories(GetAllSubcategoriesRequest request, CancellationToken cancellationToken)
        {
            var subcategories = await _subcategoryRepo.GetAllSubcategories(request, cancellationToken);
            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : subcategories.Count(),
                TotalItems = subcategories.Count(),
                TotalPages = request.Pagination != null ? (subcategories.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1
            };
            if (request.Pagination != null)
                subcategories = subcategories.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            var list = subcategories.Select(x => SubcategoryMapper.ToShort(x)).ToList();
            return new GetShortSubcategoriesResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
    }
}
