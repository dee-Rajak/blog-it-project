using Microsoft.EntityFrameworkCore;

namespace BlogAPI.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> optoins) : base(optoins) { }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<BlogPostTag> BlogPostTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Many to many relationship between BlogPost and Tag
            modelBuilder.Entity<BlogPostTag>()
                .HasKey(bt => new { bt.BlogPostId, bt.TagId });
            modelBuilder.Entity<BlogPostTag>()
                .HasOne(bt => bt.BlogPost)
                .WithMany(bp => bp.BlogPostTags)
                .HasForeignKey(bt => bt.BlogPostId);
            modelBuilder.Entity<BlogPostTag>()
                .HasOne(bt => bt.Tag)
                .WithMany(t => t.BlogPostTag)
                .HasForeignKey(bt => bt.TagId);

            //One to Many relationship between BlogPost and Author
            modelBuilder.Entity<BlogPost>()
                .HasOne(bp=>bp.Author)
                .WithMany(a=>a.BlogPosts)
                .HasForeignKey(bp=>bp.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);
            //One to many relationship between BlogPost and Comments
            modelBuilder.Entity<Comment>()
                .HasOne(c=> c.User)
                .WithMany(bp => bp.Comments)
                .HasForeignKey(c => c.BlogPostId)
                .OnDelete(DeleteBehavior.Cascade);
            //One to many relationship between User and Comments 
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }

    }
}
