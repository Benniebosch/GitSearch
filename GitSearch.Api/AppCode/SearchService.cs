using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace TibaWebApi.AppCode
{
    public class SearchService : ISearchService
    {
        const string gitSearchrepositoriesUrl = "https://api.github.com/search/repositories?q={query}&sort=stars&order=desc";

        private readonly ILogger<SearchService> _logger;
        private readonly GitSearchOptions _gitSearchOptions;
        private readonly HttpClient _httpClient;

        public SearchService(ILogger<SearchService> logger, IOptions<GitSearchOptions> gitSearchOptions)
        {
            _logger = logger;
            _gitSearchOptions = gitSearchOptions.Value;
            _httpClient = new HttpClient();
        }

        public async Task<dynamic> Search(string query)
        {
            var pqs = HttpUtility.ParseQueryString(string.Empty);
            pqs["q"] = query;
            pqs["sort"] = _gitSearchOptions.sort;
            pqs["order"] = _gitSearchOptions.order;

            var builder = new UriBuilder(_gitSearchOptions.url) { Port = -1, Query = pqs.ToString() };
            //var requestUrl = builder.ToString();
            _logger.LogDebug($"builder.Uri:{builder.Uri}");

            var request = new HttpRequestMessage(HttpMethod.Get, builder.Uri);
            request.Headers.Add("User-Agent", "TibaTestApi");
            request.Headers.Add("Accept", "application/json");

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            using var responseStream = await response.Content.ReadAsStreamAsync();

            return await JsonSerializer.DeserializeAsync<dynamic>(responseStream);
        }
    }

}
