using BlogItAPI.Data;
using BlogItAPI.Models;
using BlogItAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BlogItAPI.Repositories.Implementations
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly AppDbContext _context;
        public BlogPostRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddBlogPostAsync(BlogPost blogPost)
        {
            await _context.BlogPosts.AddAsync(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBlogPostAsync(int id)
        {
            var blogPost = await GetBlogPostByIdAsync(id);
            if(blogPost!=null)
            {
                _context.BlogPosts.Remove(blogPost);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync()
        {
            return await _context.BlogPosts.Include(b => b.Author).ToListAsync();
        }

        public async Task<BlogPost> GetBlogPostByIdAsync(int id)
        {
            return await _context.BlogPosts.Include(b => b.Author).FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task UpdateBlogPostAsync(BlogPost blogPost)
        {
            _context.BlogPosts.Update(blogPost);
            await _context.SaveChangesAsync();
        }

        public async Task LikePostAsync(int id)
        {
            var blogPost = await _context.BlogPosts.FindAsync(id);
            if(blogPost!=null)
            {
                blogPost.Likes++;
               await  _context.SaveChangesAsync();
            }
        }
    }
}
