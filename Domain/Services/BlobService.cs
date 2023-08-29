using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class BlobService
    {
        private readonly BlobContainerClient _blobContainerClient;

        public BlobService(IConfiguration configuration)
        {
            var connectionString = configuration["Azure:ConnectionString"];
            var containerName = configuration["Azure:Name"];
            _blobContainerClient = new BlobContainerClient(connectionString, containerName);

        }

        public async Task<bool> Upload(string name, IFormFile file, string directory)
        {
            try
            {
                var client = _blobContainerClient.GetBlobClient(directory + name);
                await using (Stream? data = file.OpenReadStream())
                {
                    await client.UploadAsync(data);
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
            }
        }
        public async Task<BlobDownloadInfo?> GetFileAsync(string path, CancellationToken ct)
        {
            var blobClient = _blobContainerClient.GetBlobClient(path);
            if (!await blobClient.ExistsAsync(ct))
            {
                return null;
            }

            var data = await blobClient.DownloadAsync(ct);
            return data;
        }
        public async Task<bool> DeleteFileFromBlobStorageAsync(string path)
        {
            var blobClient = _blobContainerClient.GetBlobClient(path);
            if (!await blobClient.ExistsAsync())
            {
                return false;
            }

            await blobClient.DeleteAsync();
            return true;
        }
        public async Task<bool> HandleImageEditAsync(IFormFile image, string path, string directory)
        {
            if (image is null)
            {
                return await DeleteFileFromBlobStorageAsync(path);
            }

            return await Upload(path, image, directory);

        }
    }
}
