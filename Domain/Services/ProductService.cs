using Contracts.Requests.Product;
using Contracts.Responses.Product;
using Domain.Mappers;
using Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<bool> CreateProduct(CreateProductRequest request, CancellationToken cancellationToken)
        {
            var product = _productMapper.ToEntity(request);
            return await _productRepo.CreateProduct(product, cancellationToken);
        }

        public async Task<bool> UpdateProduct(PutProductRequest request, CancellationToken cancellationToken)
        {
            var product = _productMapper.ToUpdated(request);
            return await _productRepo.UpdateProduct(product, cancellationToken);
        }

        public async Task<bool> DeleteProduct(Guid id, CancellationToken cancellationToken)
        {
            return await _productRepo.DeleteProduct(id, cancellationToken);
        }

        public async Task<GetProductResponse?> GetProduct(Guid id, CancellationToken cancellationToken)
        {
            var product = await _productRepo.GetProduct(id, cancellationToken);
            if (product is null)
                return null;
            return _productMapper.ToDTO(product);
        }

        public async Task<List<GetProductResponse>> GetAllProducts(GetAllProductsRequest request, CancellationToken cancellationToken)
        {
            var products = await _productRepo.GetAllProducts(request, cancellationToken);
            return products.Select(x => _productMapper.ToDTO(x)).ToList();
        }
    }
}
