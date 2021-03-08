using StoremanWeb.Models;
using System.Linq;
using SqlKata.Execution;

namespace StoremanWeb.Services
{
    public class UserService
    {
        private SecurityService securityService;
        private readonly DBService dbService;

        public UserService(SecurityService securityService, DBService dB)
        {
            this.securityService = securityService;
            this.dbService = dB;
        }

        public User GetUser(int id)
        {
            var users = dbService.DBContext
                .Query()
                .From("Users")
                .Where("ID", id)
                .Get<User>();

            return users.First();
        }

        public User GetUser(string username)
        {
            var users = dbService.DBContext
                .Query("Users")
                .Where("Username", username)
                .Get<User>();
            return users.First();
        }

        internal bool ValidatePassword(string username, string password)
        {
            var u = GetUser(username);
            if (u is null) return false;
            var hash = securityService.Hash(password, u.Salt);
            return hash == u.Hash;
        }
    }
}
