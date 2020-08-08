using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TibaWebApi.Models
{
    public class GitRepositoryFavorite
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Int64 id { get; set; }

        [Required]
        [Index("GRF_GRID_UID", 1, IsUnique = true)]
        public string user_id { get; set; }

        [Required]
        [Index("GRF_GRID_UID", 2, IsUnique = true)]
        public Int64 git_rep_id { get; set; }

        [ForeignKey("git_rep_id")]
        public GitRepository GitRepository { get; set; }

    }
}