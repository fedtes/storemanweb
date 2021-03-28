using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoremanWeb.Models
{
    public class Article
    {
        public int ID;
        /// <summary>
        /// 0 = draft; 1 = alive; 2 = deleted
        /// </summary>
        public int HistoryStatus;
        public int ListID;
        public string Costruttore;
        public string Codice;
        public string Descrizione;
        public double PrezzoAcquisto;
        public int Scorta;
        public int Ricavo;
        public double PrezzoUnitario;
        /// <summary>
        /// [NR = numero]
        /// </summary>
        public string UnitaMisura;
        public double Quantita;
        public double Totale;
    }
}
