﻿using Contracts.Requests.Product;
using Contracts.Responses.Product;
using Domain.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [ApiController]
    public class ProductController
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet(Routes.Product.GetAll)]
        public async Task<ActionResult<GetAllProductsResponse>> GetAll([FromQuery] GetAllProductsRequest request, CancellationToken cancellationToken)
        {
            var response = await _productService.GetAllProducts(request, cancellationToken);
            return response;
        }
        [HttpGet(Routes.Product.Create)]
        public async Task<ActionResult<CreateProductResponse>> CreateProduct([FromBody] CreateProductRequest request, CancellationToken cancellationToken)
        {
            var response = await _productService.CreateProduct(request, cancellationToken);
            return response;
            //later fix this bug
        }
        [HttpPut(Routes.Product.Update)]
        public async Task<ActionResult<PutProductResponse>> UpdateProduct([FromRoute] Guid id, [FromBody] PutProductRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _productService.UpdateProduct(request, cancellationToken);
            return response;
        }
        [HttpDelete(Routes.Product.Delete)]
        public async Task<ActionResult<DeleteProductResponse>> DeleteProduct([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _productService.DeleteProduct(id, cancellationToken);
            return response;
        }
        [HttpGet(Routes.Product.Get)]
        public async Task<ActionResult<GetProductResponse>> GetProduct([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _productService.GetProduct(id, cancellationToken);
            return response;
        }
    }
}
