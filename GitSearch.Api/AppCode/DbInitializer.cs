using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TibaWebApi.Models;

namespace TibaWebApi.AppCode
{
    public static class DbInitializer
    {

        public static void Initialize(TibaDbContext context)
        {
            if (context.GitRepository.Any())
            {
                return;
            }

            context.Database.EnsureCreated();

            var gri = new GitRepository[]
            {
                new GitRepository{ id = 1, description = "desc1", forks = 111, full_name = "aaaa", html_url ="http://aaaa.bbb.cc", open_issues = 12, watchers = 342  },
                new GitRepository{ id = 2, description = "desc2", forks = 222, full_name = "bbbb", html_url ="http://aaaa.bbb.cc", open_issues = 7, watchers = 345  },
                new GitRepository{ id = 3, description = "desc3", forks = 333, full_name = "ccccc", html_url ="http://aaaa.bbb.cc", open_issues = 3, watchers = 215  },
                new GitRepository{ id = 4, description = "desc4", forks = 444, full_name = "dddd", html_url ="http://aaaa.bbb.cc", open_issues = 32, watchers = 125  },
                new GitRepository{ id = 5, description = "desc5", forks = 555, full_name = "eeee", html_url ="http://aaaa.bbb.cc", open_issues = 5, watchers = 825  },
                new GitRepository{ id = 6, description = "desc6", forks = 666, full_name = "eeee", html_url ="http://aaaa.bbb.cc", open_issues = 5, watchers = 825  },
            };
            foreach (var s in gri)
            {
                context.GitRepository.Add(s);
            }

            var uf = new GitRepositoryFavorite[]
           {
                new GitRepositoryFavorite{ git_rep_id = 1, user_id = "bennie" },
                new GitRepositoryFavorite{ git_rep_id = 2, user_id = "bennie" },
                new GitRepositoryFavorite{ git_rep_id = 3, user_id = "bennie" },
                new GitRepositoryFavorite{ git_rep_id = 4, user_id = "avi" },
                new GitRepositoryFavorite{ git_rep_id = 5, user_id = "avi" },
                new GitRepositoryFavorite{ git_rep_id = 6, user_id = "avi" },

           };
            foreach (var s in uf)
            {
                context.GitRepositoryFavorite.Add(s);
            }

            context.SaveChanges();
        }
    }
}
