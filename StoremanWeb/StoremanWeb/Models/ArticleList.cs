using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoremanWeb.Models
{
    public class ArticleList
    {
        public int ID;
        public string Descrizione;

        /// <summary>
        /// 0 = draft; 1 = alive; 2 = deleted
        /// </summary>
        public int HistoryStatus;

        /// <summary>
        /// [Da Scaricare; Scaricata]
        /// </summary>
        public string Stato;
    }
}
