using Contracts.Requests.PreviousClients;
using Contracts.Responses.PreviousClient;
using Data.Models;

namespace Domain.Mappers
{
    public class PreviousClientMapper
    {
        public GetPreviousClientResponse ToDTO(PreviousClient previousClient)
        {
            return new GetPreviousClientResponse
            {
                Id = previousClient.Id,
                Description = previousClient.Description,
                Image = previousClient.Image,
                Name = previousClient.Name,
                Website = previousClient.Website,
                Rating = previousClient.Rating,
            };
        }
        public PreviousClient ToEntity(CreatePreviousClientRequest request)
        {
            return new PreviousClient
            {
                Image = request.Image,
                Name = request.Name,
                Website = request.Website,
                Rating = request.Rating,
                Description = request.Description,
                Id = Guid.NewGuid(),

            };
        }
    }
}
