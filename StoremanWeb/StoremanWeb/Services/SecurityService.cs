﻿using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace StoremanWeb.Services
{
    public class SecurityService
    {

        public String GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }


        public String Hash(string input, string salt)
        {
            byte[] _salt = Convert.FromBase64String(salt);
            byte[] hash = KeyDerivation.Pbkdf2(input, _salt, KeyDerivationPrf.HMACSHA256, 10000, 32);
            return Convert.ToBase64String(hash);
        }
    }
}
