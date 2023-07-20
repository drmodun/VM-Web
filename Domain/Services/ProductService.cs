using Contracts.Requests.Product;
using Contracts.Responses;
using Contracts.Responses.Product;
using Domain.Mappers;
using Domain.Repositories;

namespace Domain.Services
{
    public class ProductService
    {
        private readonly ProductRepo _productRepo;
        private readonly ProductMapper _productMapper;

        public ProductService(ProductRepo productRepo, ProductMapper productMapper)
        {
            _productRepo = productRepo;
            _productMapper = productMapper;
        }

        public async Task<CreateProductResponse> CreateProduct(CreateProductRequest request, CancellationToken cancellationToken)
        {
            var product = _productMapper.ToEntity(request);
            var action = await _productRepo.CreateProduct(product, cancellationToken);
            return new CreateProductResponse
            {
                Success = action
            };
        }

        public async Task<PutProductResponse> UpdateProduct(PutProductRequest request, CancellationToken cancellationToken)
        {
            var product = _productMapper.ToUpdated(request);
            var action = await _productRepo.UpdateProduct(product, cancellationToken);
            return new PutProductResponse
            {
                Success = action
            };
        }

        public async Task<DeleteProductResponse> DeleteProduct(Guid id, CancellationToken cancellationToken)
        {
            var action = await _productRepo.DeleteProduct(id, cancellationToken);
            return new DeleteProductResponse
            {
                Success = action
            };
        }

        public async Task<GetProductResponse?> GetProduct(Guid id, CancellationToken cancellationToken)
        {
            var product = await _productRepo.GetProduct(id, cancellationToken);
            if (product is null)
                return null;
            return _productMapper.ToDTO(product);
        }

        public async Task<GetAllProductsResponse> GetAllProducts(GetAllProductsRequest request, CancellationToken cancellationToken)
        {
            //might have been better to use a null coalescing operator here
            var products = await _productRepo.GetAllProducts(request, cancellationToken);
            var list = products.Select(x => _productMapper.ToDTO(x)).ToList();


            var pageInfo = 
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                             PageSize = request.Pagination != null ? request.Pagination.PageSize : list.Count,
                TotalItems = list.Count,
                TotalPages = request.Pagination != null ? (list.Count + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1,
            };
            return new GetAllProductsResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }
    }
}
