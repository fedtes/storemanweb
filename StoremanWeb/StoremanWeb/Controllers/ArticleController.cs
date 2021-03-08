﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StoremanWeb.Services;
using SqlKata.Execution;
using StoremanWeb.Models;
using Microsoft.AspNetCore.Authorization;

namespace StoremanWeb.Controllers
{
    [Route("api/v1/article")]
    [ApiController]
    [Authorize]
    public class ArticleController : ControllerBase
    {
        private readonly DBService dbservice;

        public ArticleController(DBService service)
        {
            this.dbservice = service;
        }

        [HttpGet()]
        [Route("")]
        public async Task<ActionResult> GetArticles(
            string costruttore,
            string descrizione,
            string codice,
            int page = 1)
        {
            var query = dbservice.DBContext.Query().From("Articles");

            if (!String.IsNullOrEmpty(costruttore))
                query.WhereLike("Costruttore", costruttore);

            if (!String.IsNullOrEmpty(descrizione))
                query.WhereLike("Descrizione", descrizione);

            if (!String.IsNullOrEmpty(codice))
                query.WhereLike("Codice", codice);

            query.Where("ListID", -1);
            query.Where("HistoryStatus", 0);

            query.ForPage(page, 15);

            var a = await query.GetAsync<Article>();

            return new JsonResult(a);
        }

        [HttpGet()]
        [Route("{id}")]
        public async Task<ActionResult> GetArticle(int id)
        {
            var query = dbservice.DBContext.Query().From("Articles");
            query.WhereLike("ID", id);
            query.Where("ListID", -1);
            query.Where("HistoryStatus", 0);
            var a = await query.GetAsync<Article>();
            return new JsonResult(a.First());
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult> CreateArticle([FromBody] Article article)
        {
            var id = await dbservice.DBContext.Query()
                .InsertGetIdAsync<int>(new
                {
                    HistoryStatus = article.HistoryStatus,
                    ListID = -1,
                    Costruttore = article.Costruttore,
                    Codice = article.Codice,
                    Decrizione = article.Descrizione,
                    PrezzoAcquisto = article.PrezzoAcquisto,
                    Scorta = article.Scorta,
                    Ricavo = article.Ricavo,
                    PrezzoUnitario = article.PrezzoAcquisto * (article.Ricavo / 100),
                    UnitaMisura = article.UnitaMisura,
                    Quantita = 0,
                    Totale = 0
                });

            return await this.GetArticle(id);
        }

        [HttpPut]
        [Route("")]
        public async Task<ActionResult> UpdateArticle([FromBody] Article article)
        {
            if (article.ID == -1)
                return new StatusCodeResult(400);

            await dbservice.DBContext.Query("Articles")
                .Where("ID", article.ID)
                .UpdateAsync(new
                {
                    HistoryStatus = article.HistoryStatus,
                    ListID = -1,
                    Costruttore = article.Costruttore,
                    Codice = article.Codice,
                    Decrizione = article.Descrizione,
                    PrezzoAcquisto = article.PrezzoAcquisto,
                    Scorta = article.Scorta,
                    Ricavo = article.Ricavo,
                    PrezzoUnitario = article.PrezzoAcquisto * (article.Ricavo / 100),
                    UnitaMisura = article.UnitaMisura,
                    Quantita = 0,
                    Totale = 0
                });

            return new StatusCodeResult(200);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteArticle(int id)
        {
            if (id == -1)
                return new StatusCodeResult(400);

            await dbservice.DBContext.Query("Articles")
                .Where("ID", id)
                .UpdateAsync(new
                {
                    HistoryStatus = 2
                });

            return new StatusCodeResult(200);
        }
    }
}