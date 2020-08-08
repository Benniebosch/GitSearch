using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using GitSearch.Core.Models;

namespace GitSearch.Core.Entities
{
    public class GitSearchDbContext : DbContext
    {
        public GitSearchDbContext(DbContextOptions<GitSearchDbContext> options): base(options)
        {
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder options)
           //=> options.UseSqlServer("name=DefaultConnection");

        public DbSet<GitRepository> GitRepository { get; set; }
        public DbSet<GitRepositoryFavorite> GitRepositoryFavorite { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GitRepositoryFavorite>().ToTable("GitRepositoryFavorite");
            modelBuilder.Entity<GitRepository>().ToTable("GitRepository");

            modelBuilder.Entity<GitRepositoryFavorite>(b => {
                b.HasKey(p => p.id);
                b.Property(p => p.id).ValueGeneratedOnAdd();
            });
            

            modelBuilder.Entity<GitRepository>().HasKey(p => p.id);
        }
    }
}
