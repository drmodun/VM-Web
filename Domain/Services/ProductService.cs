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
        private readonly FavouritesRepo _favouriteRepo;

        public ProductService(ProductRepo productRepo, FavouritesRepo favouritesRepo)
        {
            _productRepo = productRepo;
            _favouriteRepo = favouritesRepo;
        }


        public async Task<CreateProductResponse> CreateProduct(CreateProductRequest request, CancellationToken cancellationToken)
        {
            var product = ProductMapper.ToEntity(request);
            var action = await _productRepo.CreateProduct(product, cancellationToken);
            return new CreateProductResponse
            {
                Success = action
            };
        }

        public async Task<PutProductResponse> UpdateProduct(PutProductRequest request, CancellationToken cancellationToken)
        {
            var product = ProductMapper.ToUpdated(request);
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

        public async Task<GetProductResponse?> GetProduct(Guid id, CancellationToken cancellationToken, Guid? userId)
        {
            var product = await _productRepo.GetProduct(id, cancellationToken);
            if (product is null)
                return null;
            return ProductMapper.ToDTO(product, userId);
        }

        public async Task<GetSimilarResponse> GetSimilar(GetSimilarProductsRequest request, CancellationToken cancellationToken)
        {
            var products = await _productRepo.GetSimilar(request, cancellationToken);
            return new GetSimilarResponse
            {
                Items = products.Select(ProductMapper.ToSimilar).ToList()
            };


        }

        public async Task<GetAllProductsResponse> GetAllProducts(GetAllProductsRequest request, CancellationToken cancellationToken)
        {
            //might have been better to use a null coalescing operator here
            var products = await _productRepo.GetAllProducts(request, cancellationToken);
            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : products.Count(),
                TotalItems = products.Count(),
                TotalPages = request.Pagination != null ? (products.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1,
            };
            if (request.Pagination != null)
            {
                products = products.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            }
            var list = products.Select(x => ProductMapper.ToDTO(x, null)).ToList();
            return new GetAllProductsResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }

        public async Task<GetShortProductsResponse> GetShortProducts(GetAllProductsRequest request, CancellationToken cancellationToken, Guid? userId = null)
        {
            var products = await _productRepo.GetAllProductsLarge(request, cancellationToken);
            var pageInfo =
            new PageResponse
            {
                PageNumber = request.Pagination != null ? request.Pagination.PageNumber : 1,
                PageSize = request.Pagination != null ? request.Pagination.PageSize : products.Count(),
                TotalItems = products.Count(),
                TotalPages = request.Pagination != null ? (products.Count() + request.Pagination.PageSize - 1) / request.Pagination.PageSize : 1,
            };
            if (request.Pagination != null)
            {
                products = products.Skip(request.Pagination.PageSize * (request.Pagination.PageNumber - 1)).Take(request.Pagination.PageSize);
            }

            var list = products.Select(x => ProductMapper.ToShortProduct(x, userId)).ToList();
            return new GetShortProductsResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }

        public async Task<GetShortProductsResponse> GetFavouriteShortProducts(Guid userId)
        {
            var products = await _productRepo.GetFavourites(userId);
            var list = products.Select(x => ProductMapper.ToFavouriteShortProducts(userId, x)).ToList();
            var pageInfo =
            //TODO: add pagination for this
            new PageResponse
            {
                PageNumber = 1,
                PageSize = list.Count,
                TotalItems = list.Count,
                TotalPages = 1,
            };
            return new GetShortProductsResponse
            {
                Items = list,
                PageInfo = pageInfo
            };
        }

        public async Task<bool> AddToFavourites(Guid productId, Guid userId, CancellationToken cancellationToken)
        {
            return await _favouriteRepo.AddToFavourites(userId, productId, cancellationToken);

        }

        public async Task<bool> RemoveFromFavourites(Guid productId, Guid userId, CancellationToken cancellationToken)
        {
            return await _favouriteRepo.RemoveFromFavourites(userId, productId, cancellationToken);
        }
    }
}
