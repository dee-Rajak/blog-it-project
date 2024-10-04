using BlogItAPI.Models;

namespace BlogItAPI.Repositories.Interfaces
{
    public interface IBlogPostRepository
    {
        Task<IEnumerable<BlogPost>> GetAllBlogPostsAsync();

        Task<BlogPost> GetBlogPostByIdAsync(int id);

        Task AddBlogPostAsync(BlogPost blogPost);

        Task UpdateBlogPostAsync(BlogPost blogPost);

        Task DeleteBlogPostAsync(int id);

        Task LikePostAsync(int id);

    }
}
