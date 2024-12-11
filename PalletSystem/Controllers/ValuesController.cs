using JabilCore.Base.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PalletSystem.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PalletSystem.Api.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class SitesController : ControllerBase
    {
        /// <summary>
        /// Variables these are use in retrieve and write service
        /// </summary>
        protected readonly IRetrieveService<Sites> _siteRetrieveService;
        protected readonly IWriteService<Sites> _siteWriteService;

        /// <summary>
        /// Constructor with the differents objects
        /// </summary>
        /// <param name="testresultlinkRetrieveService"></param>
        public SitesController(IRetrieveService<Sites> siteRetrieveService,
            IWriteService<Sites> siteWriteService)
        {
            this._siteRetrieveService = siteRetrieveService;
            this._siteWriteService = siteWriteService;

        }

        [HttpPost, ActionName("CreateSites")]
        public IActionResult CreateSites(Sites Site)
        {
            //Site.UpdatedBy = HttpContext.User.Identity.Name;
            return Ok(this._siteWriteService.Create(Site));
        }

        [HttpPut, ActionName("UpdateSites")]
        public IActionResult UpdateSites(Sites Site)
        {
            //Site.UpdatedBy = HttpContext.User.Identity.Name;
            return Ok(this._siteWriteService.Update(Site));
        }


        [HttpPost, ActionName("DeleteSites")]
        public IActionResult DeleteSites(Sites Site)
        {
            //Site.UpdatedBy = HttpContext.User.Identity.Name;
            return Ok(this._siteWriteService.Delete(Site));
        }
        [HttpGet, ActionName("GetSites")]
        public IActionResult GetSites()
        {
            //Site.UpdatedBy = HttpContext.User.Identity.Name;
            return Ok(this._siteRetrieveService.RetrieveResultWhere(e => e.Enabled).Data.ToList());
        }
    }
}