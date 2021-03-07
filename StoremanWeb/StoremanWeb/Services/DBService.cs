using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoremanWeb.Services
{
    public class DBService
    {
        private readonly IConfiguration configuration;
        public MySqlConnector.MySqlConnection connection { get; private set; }

        public DBService(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.connection = new MySqlConnector.MySqlConnection(configuration["App:ConnectionString"]);
        }


    }
}
