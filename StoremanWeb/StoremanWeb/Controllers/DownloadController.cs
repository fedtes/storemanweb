using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoremanWeb.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoremanWeb.Controllers
{
    [Route("api/v1/download")]
    [ApiController]
    [Authorize]
    public class DownloadController : ControllerBase
    {
        private readonly ExcelService excel;

        public DownloadController(ExcelService excel)
        {
            this.excel = excel;
        }


        [HttpGet("articlelist/{id}")]
        public async Task<ActionResult> DownloadArticleList(int id)
        {
            byte[] content = await excel.CreateArticleListExcel(id);
            return File(content, 
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "EX_" + DateTime.Now.ToString("yyyyMMddHHmm"));
        }

        [HttpGet("article")]
        public async Task<ActionResult> DownloadAll()
        {
            byte[] content = await excel.CreateArticleListExcel(-1);
            return File(content,
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "EX_ALL_" + DateTime.Now.ToString("yyyyMMddHHmm"));
        }

    }
}
