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
        public async Task<ActionResult> GetArticleLists(string descrizione, int page=1)
        {
            var query = dbservice.DBContext.Query().From("ArticleList");

            if (!String.IsNullOrEmpty(descrizione))
                query.WhereLike("Descrizione", descrizione);

            query.Where("HistoryStatus", 1);

            query.ForPage(page, 15);

            var a = await query.GetAsync<ArticleList>();

            return new JsonResult(a);
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
                    Descrizione = articleList.Descrizione,
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
                    Descrizione = articleList.Descrizione,
                    HistoryStatus = articleList.HistoryStatus,
                    Stato = articleList.Stato
                });


            return new StatusCodeResult(200);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteArticleList(int id)
        {
            if (id == -1)
                return new StatusCodeResult(400);

            await dbservice.DBContext.Query("ArticleList")
                .Where("ID", id)
                .UpdateAsync(new
                {
                    HistoryStatus = 2
                });

            return new StatusCodeResult(200);
        }

        [HttpGet]
        [Route("{id}/item")]
        public async Task<ActionResult> GetArticles(int id, int page)
        {
            var query = dbservice.DBContext.Query().From("Articles");
            query.Where("ListID", id);
            query.Where("HistoryStatus", 1);

            query.ForPage(page, 15);

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

            var newid = await dbservice.DBContext.Query()
                .InsertGetIdAsync<int>(new {
                    HistoryStatus = article.HistoryStatus,
                    ListID = id,
                    Costruttore = article.Costruttore,
                    Codice = article.Codice,
                    Decrizione = article.Descrizione,
                    PrezzoAcquisto = article.PrezzoAcquisto,
                    Scorta = article.Scorta,
                    Ricavo = article.Ricavo,
                    PrezzoUnitario = article.PrezzoAcquisto * (article.Ricavo / 100),
                    UnitaMisura = article.UnitaMisura,
                    Quantita = 1,
                    Totale = article.PrezzoAcquisto * (article.Ricavo / 100) * 1
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
                    Decrizione = article.Descrizione,
                    PrezzoAcquisto = article.PrezzoAcquisto,
                    Scorta = article.Scorta,
                    Ricavo = article.Ricavo,
                    PrezzoUnitario = article.PrezzoAcquisto * (article.Ricavo / 100),
                    UnitaMisura = article.UnitaMisura,
                    Quantita = article.Quantita,
                    Totale = article.PrezzoAcquisto * (article.Ricavo / 100) * article.Quantita
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

            return new StatusCodeResult(200);
        }

    }
}