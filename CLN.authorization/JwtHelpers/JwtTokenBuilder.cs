using AuthorizationTest.JwtHelpers;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;

namespace CLN.api.Controllers
{
    public sealed class JwtTokenBuilder : IJwtTokenBuilder
    {
        private SecurityKey securityKey = null;
        private string subject = string.Empty;
        private string issuer = string.Empty;
        private string audience = string.Empty;
        private readonly List<KeyValuePair<string, string>> claims = new();
        private int expiryInDays = 30;
        private int expiryInMinutes = 15;

        public JwtTokenBuilder AddSecurityKey(SecurityKey securityKey)
        {
            this.securityKey = securityKey;
            return this;
        }

        public JwtTokenBuilder AddSubject(string subject)
        {
            this.subject = subject;
            return this;
        }

        public JwtTokenBuilder AddIssuer(string issuer)
        {
            this.issuer = issuer;
            return this;
        }

        public JwtTokenBuilder AddAudience(string audience)
        {
            this.audience = audience;
            return this;
        }

        public JwtTokenBuilder AddClaim(string type, string value)
        {
            this.claims.Add(new KeyValuePair<string, string>(type, value));
            return this;
        }

        public JwtTokenBuilder AddRole(string value)
        {
            this.claims.Add(new KeyValuePair<string, string>(ClaimTypes.Role, value));
            return this;
        }

        public JwtTokenBuilder AddUsername(string value)
        {
            this.claims.Add(new KeyValuePair<string, string>(ClaimTypes.Name, value));
            return this;
        }

        public JwtTokenBuilder AddClaims(IEnumerable<Claim> claims)
        {
            this.claims.AddRange(from item in claims
                                 select new KeyValuePair<string, string>(item.Type, item.Value));
            //this.claims.Union(claims);
            return this;
        }

        public JwtTokenBuilder AddExpiry(int expiryInDays)
        {
            this.expiryInDays = expiryInDays;
            return this;
        }

        public JwtTokenBuilder AddExpiryinMinute(int expiryInMinute)
        {
            this.expiryInMinutes = expiryInMinute;
            return this;
        }

        public JwtTokenBuilder AddExpiryInDays(int expiryInDays)
        {
            this.expiryInDays = expiryInDays;
            return this;
        }

        public JwtToken Build()
        {
            EnsureArguments();

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, this.subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }.Union(this.claims.Select(item => new Claim(item.Key, item.Value)));

            JwtSecurityToken token = new(
                issuer: this.issuer,
                audience: this.audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryInMinutes),
                signingCredentials: new SigningCredentials(
                    this.securityKey, SecurityAlgorithms.HmacSha256));

            return new JwtToken(token);
        }

        #region private

        private void EnsureArguments()
        {
            if (this.securityKey == null)
                throw new ArgumentNullException("Security Key");

            if (string.IsNullOrEmpty(this.issuer))
                throw new ArgumentNullException("Issuer");

            if (string.IsNullOrEmpty(this.audience))
                throw new ArgumentNullException("Audience");
        }

        #endregion

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = this.issuer,
                ValidAudience = this.audience,
                IssuerSigningKey = this.securityKey
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            ClaimsPrincipal principal;

            try
            {
                principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            }
            catch (SecurityTokenExpiredException)
            {
                throw new SecurityTokenException("Invalid token");
            }

            if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }

        public string GenerateAccessToken(IEnumerable<Claim> claims, string serverSigningPassword, string accessTokenDurationInMinutes)
        {
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(serverSigningPassword));

            var jwtToken = new JwtSecurityToken(issuer: "Blinkingcaret",
                audience: "Anyone",
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(accessTokenDurationInMinutes)),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);

        }

    }
}