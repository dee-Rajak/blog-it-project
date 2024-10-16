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

        public async Task<IEnumerable<BlogPost>> GetBlogPostByAuthorId(int? authorId)
        {

            return await _context.BlogPosts.Where(c => c.AuthorId == authorId).ToListAsync();
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

        public async Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync(string? query, string? sortBy, string? sortDirection, int? pageNumber = 1, int? pageSize = 10)
        {
            //searching
            var blogPosts = _context.BlogPosts.AsQueryable();

            if(string.IsNullOrEmpty(query)==false)
            {
                blogPosts = _context.BlogPosts.Where(x => x.Title.Contains(query));
            }


            //sorting

            if(string.IsNullOrEmpty(sortBy)==false)
            {
                if(string.Equals(sortBy,"Title",StringComparison.OrdinalIgnoreCase))
                {
                    var isAsc = string.Equals(sortDirection,"Asc",StringComparison.OrdinalIgnoreCase) ? true : false;

                    blogPosts = isAsc? blogPosts.OrderBy(x=>x.Title) : blogPosts.OrderByDescending(x=>x.Title);                 
                }

                if(string.Equals(sortBy,"Likes",StringComparison.OrdinalIgnoreCase))
                {
                    var isAsc = string.Equals(sortDirection,"Asc",StringComparison.OrdinalIgnoreCase) ? true : false;
                    blogPosts = isAsc? blogPosts.OrderBy(x=>x.LikeCount) : blogPosts.OrderByDescending(x=>x.LikeCount);
                }

                if(string.Equals(sortBy, "CreatedDate", StringComparison.OrdinalIgnoreCase))
                {
                    var isAsc = string.Equals(sortDirection, "Asc", StringComparison.OrdinalIgnoreCase) ? true : false;
                    blogPosts = isAsc ? blogPosts.OrderBy(x => x.CreatedDate) : blogPosts.OrderByDescending(x => x.CreatedDate);
                }
            }

            //pagination 
            var skipResults = (pageNumber - 1) * pageSize;

            blogPosts = blogPosts.Skip(skipResults ?? 0).Take(pageSize ?? 10);

            return await blogPosts.Include(b => b.Author).Include(b=>b.Comments).ToListAsync();
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

        public async Task LikePostAsync(int authorId, int blogPostId)
        {
            var existingLike = await _context.Likes.FirstOrDefaultAsync(l => l.AuthorId == authorId && l.BlogPostId == blogPostId);
            var blogPost = await _context.BlogPosts.FindAsync(blogPostId);

           
            if (existingLike != null)
            {
                _context.Likes.Remove(existingLike);
                blogPost.LikeCount--;
                await _context.SaveChangesAsync();
                
            }
            else
            {
                var like = new Like { AuthorId = authorId, BlogPostId = blogPostId };
                await _context.Likes.AddAsync(like);
                blogPost.LikeCount++;
                await _context.SaveChangesAsync();
              
            }
        }
    }
}
