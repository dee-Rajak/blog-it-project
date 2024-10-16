using BlogItAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Identity.Client;

namespace BlogItAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {
            
        }

        public DbSet<Author> Authors { get; set; }
        public DbSet<BlogPost> BlogPosts {  get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<BlogPost>()
                .HasMany(b => b.Comments)
                .WithOne(c => c.BlogPost)
                .OnDelete(DeleteBehavior.Cascade);

                modelBuilder.Entity<BlogPost>()
                .HasMany(b => b.Likes)
                .WithOne(c => c.BlogPost)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Author>()
       .HasIndex(a => a.Email)
       .IsUnique();




        }
    }
}
