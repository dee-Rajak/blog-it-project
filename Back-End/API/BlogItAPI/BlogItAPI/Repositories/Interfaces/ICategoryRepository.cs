using BlogItAPI.Models;

namespace BlogItAPI.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetCategoriesAsync(string? query = null,string? sortBy = null, string? sortDirection =null, int? pageNumber = 1, int? pageSize = 5);

        Task<Category> GetCategoryByIdAsync(int id);

        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);

        Task DeleteCategoryAsync(int id);
    }
}
