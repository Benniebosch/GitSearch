using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GitSearch.Core.Entities
{
    public class GitRepository
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public Int64 id { get; set; }
        public string full_name { get; set; }
        public string html_url { get; set; }
        public string description { get; set; }
        public int forks { get; set; }
        public int open_issues { get; set; }
        public int watchers { get; set; }

        public ICollection<GitRepositoryFavorite> favorites { get; set; }
    }
}
