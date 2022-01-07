using ClosedXML.Excel;
using SqlKata.Execution;
using StoremanWeb.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StoremanWeb.Services
{
    public class ExcelService
    {
        private readonly DBService dB;

        public ExcelService(DBService dB)
        {
            this.dB = dB;
        }

        public async Task<Byte[]> ExportAllArticleExcel()
        {
            var query = dB.DBContext.Query().From("Articles");
            query.Where("ListID", -1);
            query.Where("HistoryStatus", 1);

            var articles = (await query.GetAsync<Article>()).ToList();

            using (var s = new MemoryStream())
            using (var workbook = new XLWorkbook(XLEventTracking.Disabled))
            {
                var worksheet = workbook.Worksheets.Add("Sheet1");
                /* Intestazioni */
                worksheet.Cell("A1").SetValue("Costruttore");
                worksheet.Cell("B1").SetValue("Codice");
                worksheet.Cell("C1").SetValue("Descrizione");
                worksheet.Cell("D1").SetValue("Prezzo Acquisto");
                worksheet.Cell("E1").SetValue("Ricavo");
                worksheet.Cell("F1").SetValue("Prezzo Unitario");
                worksheet.Cell("G1").SetValue("UnitaMisura");
                worksheet.Cell("H1").SetValue("Scorta");

                for (int i = 0; i < articles.Count(); i++)
                {
                    worksheet.Cell(i + 2, "A")
                        .SetDataType(XLDataType.Text)
                        .SetValue<string>(articles[i].Costruttore);

                    worksheet.Cell(i + 2, "B")
                        .SetDataType(XLDataType.Text)
                        .SetValue<string>(articles[i].Codice);

                    worksheet.Cell(i + 2, "C")
                        .SetDataType(XLDataType.Text)
                        .SetValue<string>(articles[i].Descrizione);

                    var cellD = worksheet.Cell(i + 2, "D")
                        .SetDataType(XLDataType.Number);
                    cellD.Style.NumberFormat.Format = "€ #,##0.00##";
                    cellD.SetValue<double>(articles[i].PrezzoAcquisto);

                    worksheet.Cell(i + 2, "E")
                        .SetDataType(XLDataType.Number)
                        .SetValue<int>(articles[i].Ricavo);

                    var cellF = worksheet.Cell(i + 2, "F")
                        .SetDataType(XLDataType.Number);
                    cellF.Style.NumberFormat.Format = "€ #,##0.00##";
                    cellF.SetValue<double>(articles[i].PrezzoUnitario);

                    worksheet.Cell(i + 2, "G")
                        .SetDataType(XLDataType.Text)
                        .SetValue<string>(articles[i].UnitaMisura);

                    worksheet.Cell(i + 2, "H")
                        .SetDataType(XLDataType.Number)
                        .SetValue<int>(articles[i].Scorta);
                }

                workbook.SaveAs(s);
                return s.ToArray();
            }
        }

        public async Task<Byte[]> CreateArticleListExcel(int articleListID)
        {
            var query = dB.DBContext.Query().From("Articles");
            query.Where("ListID", articleListID);
            query.Where("HistoryStatus", 1);

            var articles = (await query.GetAsync<Article>()).ToList();

            using(var s = new MemoryStream())
            using (var workbook = new XLWorkbook(XLEventTracking.Disabled))
            {
                var worksheet = workbook.Worksheets.Add("Sheet1");

                /* Intestazioni */
                worksheet.Cell("A1").SetValue("Costruttore");
                worksheet.Cell("B1").SetValue("Codice");
                worksheet.Cell("C1").SetValue("Descrizione");
                // empty col
                worksheet.Cell("E1").SetValue("Prezzo Acquisto");
                worksheet.Cell("F1").SetValue("Ricavo");
                worksheet.Cell("G1").SetValue("Prezzo Unitario");
                worksheet.Cell("H1").SetValue("UnitaMisura");
                worksheet.Cell("I1").SetValue("Quantita");
                worksheet.Cell("J1").SetValue("Totale");

                for (int i = 0; i < articles.Count(); i++)
                {
                    worksheet.Cell(i + 2, "A")
                        .SetDataType(XLDataType.Text)
                        .SetValue<string>(articles[i].Costruttore);

                    worksheet.Cell(i + 2, "B")
                        .SetDataType(XLDataType.Text)
                        .SetValue<string>(articles[i].Codice);

                    worksheet.Cell(i + 2, "C")
                        .SetDataType(XLDataType.Text)
                        .SetValue<string>(articles[i].Descrizione);

                    var cellD = worksheet.Cell(i + 2, "E")
                        .SetDataType(XLDataType.Number);
                    cellD.Style.NumberFormat.Format = "€ #,##0.00##";
                    cellD.SetValue<double>(articles[i].PrezzoAcquisto);

                    worksheet.Cell(i + 2, "F")
                        .SetDataType(XLDataType.Number)
                        .SetValue<int>(articles[i].Ricavo);

                    var cellF = worksheet.Cell(i + 2, "G")
                        .SetDataType(XLDataType.Number);
                    cellF.Style.NumberFormat.Format = "€ #,##0.00##";
                    cellF.SetValue<double>(articles[i].PrezzoUnitario);

                    worksheet.Cell(i + 2, "H")
                        .SetDataType(XLDataType.Text)
                        .SetValue<string>(articles[i].UnitaMisura);

                    worksheet.Cell(i + 2, "I")
                        .SetDataType(XLDataType.Number)
                        .SetValue<double>(articles[i].Quantita);

                    var cellI = worksheet.Cell(i + 2, "J")
                        .SetDataType(XLDataType.Number);
                    cellI.Style.NumberFormat.Format = "€ #,##0.00##";
                    cellI.SetValue<double>(articles[i].Totale);

                }

                workbook.SaveAs(s);
                return s.ToArray();
            }

        }
    }
}
