using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TibaWebApi.AppCode;
using TibaWebApi.Models;

namespace TibaWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService _srv;
        private readonly ILogger<FavoriteController> _logger;

        public FavoriteController(ILogger<FavoriteController> logger, IFavoriteService srv)
        {
            _srv = srv;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var res = await _srv.GetFavorites(GetUserId());
            return Ok(res);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem(GitRepository item)
        {
            await _srv.AddFavorite(GetUserId(), item);
            return Ok();
        }

        [HttpDelete("{repId}")]
        public async Task<IActionResult> RemoveItem(Int64 repId)
        {
            await _srv.RemoveFavorite(GetUserId(), repId);
            return Ok(true);
        }
        public string GetUserId()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new Exception("user not found");
            }

            return userId;
        }
    }
}