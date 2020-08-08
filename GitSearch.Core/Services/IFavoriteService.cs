using System;
using System.Threading.Tasks;
using GitSearch.Core.Entities;
using GitSearch.Core.Models;

namespace GitSearch.Core.Services
{
    public interface IFavoriteService
    {

        Task<bool> AddFavorite(string userId, GitRepository item);
        //Task<GitRepositoryInfo> GetItem(Int64 id);
        Task<GitRepository[]> GetFavorites(string userId);
        Task<bool> RemoveFavorite(string userId, Int64 fid);
    }
}