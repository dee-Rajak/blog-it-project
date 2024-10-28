using BlogItAPI.Data;
using BlogItAPI.Models;
using BlogItAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BlogItAPI.Repositories.Implementations
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly AppDbContext _context;

        public AuthorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAuthorAsync(Author author)
        {
            await _context.Authors.AddAsync(author);
            await _context.SaveChangesAsync();

        }

        public async Task DeleteAuthorAsync(int id)
        {
            var author = await _context.Authors.FindAsync(id);
            var authorLikes = await _context.Likes.Where(l=>l.AuthorId==id).ToListAsync();
            var authorComments = await _context.Comments.Where(c=>c.CommentAuthorId == id).ToListAsync();
            if(author != null)
            {
                _context.Likes.RemoveRange(authorLikes);
                _context.Comments.RemoveRange(authorComments);
                _context.Authors.Remove(author);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Author>> GetAllAuthorsAsync()
        {
            return await _context.Authors.Include(x=>x.BlogPosts).ToListAsync();
        }

        public async Task<Author> GetAuthorByIdAsync(int id)
        {
            return await _context.Authors.FindAsync(id);
        }

        public async Task<IEnumerable<BlogPost>> GetBlogPostsByAuthorIdAsync(int authorId)
        {
            return await _context.BlogPosts.Where(bp => bp.AuthorId == authorId).ToListAsync();
        }

        public async Task UpdateAuthorAsync(Author author)
        {
            _context.Authors.Update(author);
            await _context.SaveChangesAsync();
        }

    }
}
