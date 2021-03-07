using System.Security.Claims;

namespace StoremanWeb.Helpers
{
    public static class ClaimExtensions
    {
        public static string NameIdentifier(this ClaimsPrincipal claims)
        {
            return claims.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
    }
}
