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
            

            // Prevent cascade delete for Likes -> BlogPost
            modelBuilder.Entity<Like>()
                .HasOne(l => l.BlogPost)
                .WithMany(b => b.Likes)
                .HasForeignKey(l => l.BlogPostId)
                .OnDelete(DeleteBehavior.NoAction);

            // Other relationships remain the same
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.BlogPost)
                .WithMany(b => b.Comments)
                .HasForeignKey(c => c.BlogPostId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Author>()
       .HasIndex(a => a.Email)
       .IsUnique();




        }
    }
}
