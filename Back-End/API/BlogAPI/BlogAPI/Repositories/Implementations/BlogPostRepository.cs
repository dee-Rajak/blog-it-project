using BlogAPI.Models;
using BlogAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BlogAPI.Repositories.Implementations
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext _context;
        public BlogPostRepository(ApplicationDbContext context) {
            _context = context;
        } 
        public async Task<BlogPost> GetBlogPostWithComments(Guid id)
        {
            return await _context.BlogPosts.Include(bp => bp.Comments).FirstOrDefaultAsync(bp => bp.Id == id);
           
        }
    }
}
