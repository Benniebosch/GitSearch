using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TibaWebApi.AppCode;

namespace TibaWebApi.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] //[Authorize("read:messages")]
    public class SearchController : ControllerBase
    {
        private readonly ILogger<SearchController> _logger;
        private readonly ISearchService _searchService;

        public SearchController(ILogger<SearchController> logger, ISearchService searchService)
        {
            _logger = logger;
            _searchService = searchService;
        }

        [HttpGet()]
        public async Task<IActionResult> RunSearchQuery([FromQuery]string q)
        {
            var res = await _searchService.Search(q);
            return Ok(res);
        }


    }
}
