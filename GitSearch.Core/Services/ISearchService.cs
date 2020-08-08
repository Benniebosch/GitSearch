using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace GitSearch.Core.Services
{
    public interface ISearchService
    {
        Task<dynamic> Search(string query);
    }
}