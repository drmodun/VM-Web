using Azure.Storage.Blobs.Models;
using Contracts.Constants;
using Domain.Services;
using EllipticCurve.Utils;
using Microsoft.AspNetCore.Authorization;
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
            return File(blob.Content, blob.Details.ContentType);
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]
        [HttpPost(Routes.Files.Create)]
        public async Task<ActionResult> PostBlob([FromRoute] string path, IFormFile formFile, [FromQuery] string directory)
        {
            var action = await _blobService.Upload(path, formFile, directory);
            if (action == null)
            {
                return BadRequest();
            }
            return action ? Ok(action) : BadRequest();
        }
        [Authorize(AuthConstants.AdminUserPolicyName)]

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
        [Authorize(AuthConstants.AdminUserPolicyName)]


        [HttpPut(Routes.Files.Update)]
        public async Task<ActionResult> UpdateBlob([FromRoute] string path, IFormFile formFile, [FromQuery] string directory)
        {
            var action = await _blobService.HandleImageEditAsync(formFile, path, directory);
            if (action == null)
            {
                return BadRequest();
            }
            return action ? Ok(action) : BadRequest();
        }
    }
}
