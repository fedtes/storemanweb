using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoremanWeb.Models
{
    public class User
    {
        public int ID;
        public String Name;
        public String Username;
        public String Hash;
        public String Salt;
    }

    public class Login
    {
        public string username;
        public string password;
    }
}
