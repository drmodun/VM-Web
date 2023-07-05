using Contracts.Helpers.Hash;
using Contracts.Requests;
using Contracts.Requests.User;
using Data.Models;
using Domain.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Domain.Services
{
    public class IdentityService
    {
        private const string TokenSecret = "VM-Racunala-TheBestOfAllTheWebSites=<3";
        private static readonly TimeSpan TokenLifetime = TimeSpan.FromHours(8);
        private readonly UserRepo _userRepo;

        public IdentityService(UserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<string?> LoginUser(LoginRequest request)
        {
            var user = await _userRepo.GetUserByEmail(request.Email);
            if (user == null)
            {
                return null;
            }
            var check = HashHelper.ValidatePassword(request.Password, user.Password);
            if (!check)
                return null;

            var jwtRequest = new TokenGenerationRequest
            {
                Claims = user.Claims,
                Email = user.Email,
                Name = user.Email,
                UserId = user.Id,
            };
            return GenerateToken(jwtRequest);
        }
        public string GenerateToken(TokenGenerationRequest request)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(TokenSecret);

            var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, request.Email),
            new(JwtRegisteredClaimNames.Email, request.Email),
            new(JwtRegisteredClaimNames.Name, request.Name),
            new("userid", request.UserId.ToString()),
        };

            foreach (var claimPair in request.Claims)
            {
                var boolElement = claimPair.Value;
                var valueType = boolElement switch
                {
                    "true" => ClaimValueTypes.Boolean,
                    "false" => ClaimValueTypes.Boolean,
                    _ => ClaimValueTypes.String
                };

                var claim = new Claim(claimPair.Key, claimPair.Value.ToString()!, valueType);
                claims.Add(claim);
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(TokenLifetime),
                Issuer = "https://randomwebsite.com",
                Audience = "https://randomwebsite-web-api.com",
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            //edit this to make sense later
            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }

    }
}