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


            var pageInfo =  request.Pagination is null ? null
            : new PageResponse
            {
                PageNumber = request.Pagination.PageNumber,
                PageSize = request.Pagination.PageSize
            };
            return new GetAllProductsResponse
            {
                Products = list,
                PageInfo = pageInfo
            };
        }
    }
}
