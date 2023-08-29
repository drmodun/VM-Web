using Azure.Storage.Blobs.Models;
using Domain.Services;
using EllipticCurve.Utils;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class BlobController : ControllerBase
    {
        private readonly BlobService _blobService;

        public BlobController(BlobService blobService)
        {
            _blobService = blobService;
        }

        [HttpGet(Routes.Files.Get)]
        public async Task<IActionResult> GetBlob([FromRoute] string name, CancellationToken cancellationToken)
        {
            var blob = await _blobService.GetFileAsync(name, cancellationToken);
            if (blob == null)
            {
                return NotFound();
            }
            //TODO: add download file funcionality here, dont know why it doesnt work but not too important right now
            return File(blob.Content, blob.Details.ContentType);
        }

        [HttpPost(Routes.Files.Create)]
        public async Task<ActionResult> PostBlob([FromRoute] string path, IFormFile file)
        {
            var action = await _blobService.Upload(path, file);
            if (action == null)
            {
                return BadRequest();
            }
            return action ? Ok(action) : NotFound();
        }

        [HttpDelete(Routes.Files.Delete)]
        public async Task<ActionResult> DeleteBlob([FromRoute] string path)
        {
            var action = await _blobService.DeleteFileFromBlobStorageAsync(path);
            if (action == null)
            {
                return BadRequest();
            }
            return action ? Ok(action) : NotFound();
        }

        [HttpPut(Routes.Files.Update)]
        public async Task<ActionResult> UpdateBlob([FromRoute] string path, IFormFile file)
        {
            var action = await _blobService.HandleImageEditAsync(file, path);
            if (action == null)
            {
                return BadRequest();
            }
            return action ? Ok(action) : NotFound();
        }
    }
}
