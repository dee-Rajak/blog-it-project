using BlogItAPI.Models;
using Microsoft.EntityFrameworkCore;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Many to many Relationsihp between BlogPost and Category
            modelBuilder.Entity<BlogPost>()
                .HasMany(p => p.Categories)
                .WithMany(c => c.BlogPosts)
                .UsingEntity(j => j.ToTable("BlogPostCategories")); //Joining the table for many to many
        }
    }
}
