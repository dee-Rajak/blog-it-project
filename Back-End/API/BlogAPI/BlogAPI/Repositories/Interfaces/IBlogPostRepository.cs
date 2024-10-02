using BlogAPI.Models;

namespace BlogAPI.Repositories.Interfaces
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> GetBlogPostWithComments(Guid id);
    }
}
