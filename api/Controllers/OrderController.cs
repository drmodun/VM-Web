﻿using Contracts.Requests.Order;
using Contracts.Responses.Order;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet(Routes.Order.Get)]
        public async Task<ActionResult<GetOrderResponse>> GetOrder([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            var response = await _orderService.GetOrder(id, cancellationToken);
            return response == null ? NotFound() : Ok(response);
        }

        [HttpGet(Routes.Order.GetAll)]
        public async Task<ActionResult<GetAllOrdersResponse>> GetAllOrders([FromQuery] GetAllOrdersRequest request, CancellationToken cancellationToken)
        {
            var response = await _orderService.GetAllOrders(request, cancellationToken);
            return Ok(response);
        }
        [HttpGet(Routes.Order.Create)]
        public async Task<ActionResult<CreateOrderResponse>> CreateOrder([FromBody] CreateOrderRequest request, CancellationToken cancellationToken)
        {
            var response = await _orderService.CreateOrder(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
            //later fix this bug
        }
        [HttpPut(Routes.Order.Update)]
        public async Task<ActionResult<PutOrderResponse>> UpdateOrder([FromRoute] Guid id, [FromBody] PutOrderRequest request, CancellationToken cancellationToken)
        {
            request.Id = id;
            var response = await _orderService.UpdateOrder(request, cancellationToken);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        [HttpDelete(Routes.Order.Delete)]
        public async Task<ActionResult<DeleteOrderResponse>> DeleteOrder([FromRoute] Guid id, CancellationToken cancellationToken)
        {

            var response = await _orderService.DeleteOrder(id, cancellationToken);
            return response.Success ? Ok(response) : NotFound(response);
        }




    }
}