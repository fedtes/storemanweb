using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SqlKata.Execution;
using StoremanWeb.Models;
using StoremanWeb.Services;
using StoremanWeb.Helpers;

namespace StoremanWeb.Controllers
{
    [Route("api/v1/articlelist")]
    [ApiController]
    [Authorize]
    public class ArticleListController : ControllerBase
    {
        private readonly DBService dbservice;

        public ArticleListController(DBService service)
        {
            this.dbservice = service;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> GetArticleLists(string nome, string stato, DateTime? dateFrom, DateTime? dateTo, int page=1)
        {
            var query = dbservice.DBContext.Query().From("ArticleList");

            if (!String.IsNullOrEmpty(nome))
                query.WhereLike("Nome", nome);

            if (!String.IsNullOrEmpty(stato))
                query.Where("Stato", stato);

            if (dateFrom != null)
                query.Where("CDate", ">=", ((DateTime)dateFrom).ToDbString());

            if (dateTo != null)
                query.Where("CDate", "<=", ((DateTime)dateTo).ToDbString());

            query.Where("HistoryStatus", 1);

            query.ForPage(page, 15);

            try
            {
                var a = await query.GetAsync<ArticleList>();
                return new JsonResult(a);
            }
            catch (Exception ex)
            {
                throw;
            }

        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetArticleList(int id)
        {
            var query = dbservice.DBContext.Query().From("ArticleList");
            query.Where("HistoryStatus", 1);
            query.Where("ID", id);

            var a = await query.GetAsync<ArticleList>();

            return new JsonResult(a.First());
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult> CreateArticleList([FromBody] ArticleList articleList)
        {
            var id = await dbservice.DBContext
                .Query("ArticleList")
                .InsertGetIdAsync<int>(new
                {
                    Nome = articleList.Nome,
                    CDate = articleList.CDate,
                    HistoryStatus = articleList.HistoryStatus,
                    Stato = "Da Scaricare"
                });


            return await this.GetArticleList(id);
        }

        [HttpPut]
        [Route("")]
        public async Task<ActionResult> UpdateArticleList([FromBody] ArticleList articleList)
        {
            if (articleList.ID == -1)
                return new StatusCodeResult(400);

            await dbservice.DBContext
                .Query("ArticleList")
                .Where("ID", articleList.ID)
                .UpdateAsync(new
                {
                    Nome = articleList.Nome,
                    HistoryStatus = articleList.HistoryStatus,
                    Stato = articleList.Stato
                });


            return new JsonResult(new { message = "OK" });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteArticleList(int id)
        {
            if (id == -1)
                return new StatusCodeResult(400);

            /* delete all items first */
            await dbservice.DBContext.Query("Articles")
                .Where("ListID", id)
                .DeleteAsync();

            /* then the article list */
            await dbservice.DBContext.Query("ArticleList")
                .Where("ID", id)
                .DeleteAsync();

            return new JsonResult(new { message = "OK" });
        }

        [HttpGet]
        [Route("{id}/item")]
        public async Task<ActionResult> GetArticles(int id, int page)
        {
            var query = dbservice.DBContext.Query().From("Articles");
            query.Where("ListID", id);
            query.Where("HistoryStatus", 1);

            var a = await query.GetAsync<Article>();

            return new JsonResult(a);
        }

        [HttpGet()]
        [Route("{id}/item/{articleid}")]
        public async Task<ActionResult> GetArticle(int id, int articleid)
        {
            var query = dbservice.DBContext.Query().From("Articles");
            query.Where("ID", articleid);
            query.Where("ListID", id);
            query.Where("HistoryStatus", 1);
            var a = await query.GetAsync<Article>();
            return new JsonResult(a.First());
        }

        [HttpPost]
        [Route("{id}/item/{articleid}")]
        public async Task<ActionResult> AddArticle(int id, int articleid)
        {
            var articles = await dbservice.DBContext
                .Query()
                .From("Articles")
                .Where("ID", articleid)
                .Where("ListID", -1)
                .Where("HistoryStatus", 1)
                .GetAsync<Article>();

            if (!articles.Any())
                return new StatusCodeResult(400);

            var article = articles.First();

            var newid = await dbservice.DBContext.Query("Articles")
                .InsertGetIdAsync<int>(new {
                    HistoryStatus = 1,
                    ListID = id,
                    Costruttore = article.Costruttore,
                    Codice = article.Codice,
                    Descrizione = article.Descrizione,
                    PrezzoAcquisto = article.PrezzoAcquisto,
                    Scorta = article.Scorta,
                    Ricavo = article.Ricavo,
                    PrezzoUnitario = article.PrezzoAcquisto * (1 + ((double)article.Ricavo) / 100),
                    UnitaMisura = article.UnitaMisura,
                    Quantita = 0,
                    Totale = 0
                });

            return await this.GetArticle(id, newid);

        }

        [HttpPut]
        [Route("{id}/item")]
        public async Task<ActionResult> UpdateItem([FromBody] Article article, int id)
        {
            var cnt = await dbservice.DBContext
                .Query()
                .From("Articles")
                .Where("ID", article.ID)
                .Where("ListID", id)
                .Where("HistoryStatus", 1)
                .CountAsync<int>();

            if (cnt != 1)
                return new StatusCodeResult(400);

            await dbservice.DBContext.Query("Articles")
                .Where("ID", article.ID)
                .UpdateAsync(new
                {
                    HistoryStatus = article.HistoryStatus,
                    ListID = id,
                    Costruttore = article.Costruttore,
                    Codice = article.Codice,
                    Descrizione = article.Descrizione,
                    PrezzoAcquisto = article.PrezzoAcquisto,
                    Scorta = article.Scorta,
                    Ricavo = article.Ricavo,
                    PrezzoUnitario = article.PrezzoAcquisto * (1 + ((double)article.Ricavo) / 100),
                    UnitaMisura = article.UnitaMisura,
                    Quantita = article.Quantita,
                    Totale = article.Totale
                });

            return await this.GetArticle(id, article.ID);
        }

        [HttpDelete]
        [Route("{id}/item/{articleid}")]
        public async Task<ActionResult> RemoveArticle(int id, int articleid)
        {
            await dbservice.DBContext.Query("Articles")
                .Where("ID", articleid)
                .Where("ListID", id)
                .DeleteAsync();

            return new JsonResult(new { message = "OK" });
        }

    }
}