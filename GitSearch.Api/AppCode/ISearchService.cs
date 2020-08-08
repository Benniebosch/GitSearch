using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace TibaWebApi.AppCode
{
    public interface ISearchService
    {
        Task<dynamic> Search(string query);
    }
}