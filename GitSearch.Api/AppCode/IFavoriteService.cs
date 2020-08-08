using System;
using System.Threading.Tasks;
using TibaWebApi.Models;

namespace TibaWebApi.AppCode
{
    public interface IFavoriteService
    {

        Task<bool> AddFavorite(string userId, GitRepository item);
        //Task<GitRepositoryInfo> GetItem(Int64 id);
        Task<GitRepository[]> GetFavorites(string userId);
        Task<bool> RemoveFavorite(string userId, Int64 fid);
    }
}