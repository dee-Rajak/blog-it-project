using BlogItAPI.Models;

namespace BlogItAPI.Repositories.Interfaces
{
    public interface IBlogPostRepository
    {
        Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync(string? query, string? sortBy, string? sortDirection,int? pageNumber = 1, int? pageSize = 10);

      
        Task<BlogPost> GetBlogPostByIdAsync(int id);

        Task<IEnumerable<BlogPost>> GetBlogPostByAuthorId(int? authorId);

        Task AddBlogPostAsync(BlogPost blogPost);

        Task UpdateBlogPostAsync(BlogPost blogPost);

        Task DeleteBlogPostAsync(int id);

        Task LikePostAsync(int authorId, int blogPostId);

    }
}
