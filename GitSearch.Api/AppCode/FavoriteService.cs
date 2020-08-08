using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using TibaWebApi.Models;

namespace TibaWebApi.AppCode
{
    public class FavoriteService : IFavoriteService
    {
        private readonly ILogger<SearchService> _logger;
        private readonly TibaDbContext _context;

        public FavoriteService(ILogger<SearchService> logger, TibaDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<bool> AddFavorite(string userId, GitRepository item)
        { 
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var grItem = await _context.GitRepository.FindAsync(item.id);
                    if (grItem == null) _context.GitRepository.Add(item);
                    else _context.GitRepository.Update(item);
                    _context.SaveChanges();

                    var favoritItem = new GitRepositoryFavorite() { user_id = userId, git_rep_id = item.id };
                    _context.GitRepositoryFavorite.Add(favoritItem);
                    _context.SaveChanges();

                    transaction.Commit();

                    this._logger.LogInformation($"AddFavorite done, repId:${item.id}, favId:${favoritItem.id}, userId:{userId}");

                    return await Task.FromResult(true);
                }
                catch (Exception ex)
                {
                    this._logger.LogError(ex, "AddFavorite");
                    return await Task.FromResult(false);
                }
            }
        }

        public async Task<GitRepository[]> GetFavorites(string userId)
        {
            var res = await _context.GitRepositoryFavorite.Where(w => w.user_id == userId)
                .Include(o=>o.GitRepository).Select(s=>s.GitRepository).ToArrayAsync();
            return res; 
        }

        public async Task<bool> RemoveFavorite(string userId, Int64 repId)
        {
            var item = await _context.GitRepositoryFavorite.FirstOrDefaultAsync(f=>f.user_id == userId && f.git_rep_id == repId);

            if (item != null)
            {
                _context.GitRepositoryFavorite.Remove(item);
                await _context.SaveChangesAsync();
                return await Task.FromResult(true);
            }

            return await Task.FromResult(false);
        }

    }

}
