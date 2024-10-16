using BlogItAPI.Data;
using BlogItAPI.Models;
using BlogItAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BlogItAPI.Repositories.Implementations
{
    public class CommentRepository : ICommentRepository
    {
        private readonly AppDbContext _context;

        public CommentRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddCommentAsync(Comment comment)
        {
             await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

        }

        public async Task DeleteCommentAsync(int id)
        {
           var comment = await GetCommentByIdAsync(id); 
            if(comment != null)
            {
                _context.Comments.Remove(comment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Comment>> GetAllCommentsAsync()
        {
            return await _context.Comments.Include((c => c.BlogPost)).ToListAsync();
        }

        public async Task<Comment> GetCommentByIdAsync(int id)
        {
            return await _context.Comments.Include(c => c.BlogPost).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Comment>> GetCommentsByBlogPostId(int? blogPlostId)
        {
            
            return await _context.Comments.Where(c=>c.BlogPostId == blogPlostId).ToListAsync();
        }

        public async Task UpdateCommentAsync(Comment comment)
        {
            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }
    }
}
