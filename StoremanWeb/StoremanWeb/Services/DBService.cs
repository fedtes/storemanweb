
using Microsoft.Extensions.Configuration;
using SqlKata.Execution;
using System.Data.SQLite;

namespace StoremanWeb.Services
{
    public class DBService
    {
        private readonly IConfiguration configuration;
        public QueryFactory DBContext { get; private set; }

        public DBService(IConfiguration configuration)
        {
            this.configuration = configuration;
            var connection = new SQLiteConnection(configuration["App:ConnectionString"]);
            this.DBContext = new QueryFactory(connection, new SqlKata.Compilers.SqliteCompiler());
        }


    }
}
