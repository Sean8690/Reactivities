using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using Domain;

namespace API.Services
{
    public class TokenService
    {
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            //Sign token with encrypted key
           // var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
           return string.Empty;
        }
    }
}