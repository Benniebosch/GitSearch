using System.Collections.Generic;
using System.Numerics;

namespace TibaWebApi.AppCode
{
    public class GitSearchOptions
    {
        public const string GitSearch = "GitSearch";
        public string url { get; set; }
        public string sort { get; set; }
        public string order { get; set; }

        //public Dictionary<string, string> queryParams;
    }
}