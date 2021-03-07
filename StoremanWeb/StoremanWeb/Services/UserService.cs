using StoremanWeb.Models;
using System;
using MySqlConnector;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoremanWeb.Services
{
    public class UserService
    {
        private SecurityService securityService;
        private readonly DBService dB;

        public UserService(SecurityService securityService, DBService dB)
        {
            this.securityService = securityService;
            this.dB = dB;
        }

        public UserModel GetUser(int id)
        {
            UserModel user = new UserModel();
            try
            {
                dB.connection.Open();
                using (var tran = dB.connection.BeginTransaction())
                {
                    var cmd = dB.connection.CreateCommand();
                    cmd.CommandText = "SELECT * FROM Users WHERE ID = @id";
                    cmd.Parameters.Add("@id", System.Data.DbType.Int32).Value = id;
                    using (var r = cmd.ExecuteReader())
                    {
                        while (r.Read())
                        {
                            user.ID = r.GetInt32("ID");
                            user.Name = r.GetString("Name");
                            user.Username = r.GetString("Username");
                            user.Hash = r.GetString("Hash");
                            user.Salt = r.GetString("Salt");
                        }
                    } 
                }
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                dB.connection.Close();
            }

            return user;
        }

        internal bool ValidatePassword(string username, string password)
        {
            return true;
            //var u = GetUser(username);
            //if (u is null) return false;
            //var hash = securityService.Hash(password, u.Salt);
            //return hash == u.Hash;
        }
    }
}
