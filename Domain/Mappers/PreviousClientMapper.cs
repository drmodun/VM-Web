using Contracts.Requests.PreviousClients;
using Contracts.Responses.PreviousClient;
using Data.Models;

namespace Domain.Mappers
{
    public static class PreviousClientMapper
    {
        public static GetPreviousClientResponse ToDTO(PreviousClient previousClient)
        {
            return new GetPreviousClientResponse
            {
                Id = previousClient.Id,
                Description = previousClient.Description,
                Name = previousClient.Name,
                Website = previousClient.Website,
                Rating = previousClient.Rating,
            };
        }
        public static PreviousClient ToEntity(CreatePreviousClientRequest request)
        {
            return new PreviousClient
            {
                Name = request.Name,
                Website = request.Website,
                Rating = request.Rating,
                Description = request.Description,
                Id = Guid.NewGuid(),

            };
        }

        public static PreviousClient ToUpdated(PutPreviousClientRequest request)
        {
            return new PreviousClient
            {
                Name = request.Name,
                Website = request.Website,
                Rating = request.Rating,
                Description = request.Description,
                Id = request.Id
            };
        }
    }
}
