using BlogItAPI.Models;

namespace BlogItAPI.Repositories.Interfaces
{
    public interface IAuthorRepository
    {
        Task<IEnumerable<Author>> GetAllAuthorsAsync();

        Task<Author> GetAuthorByIdAsync(int id);

        Task AddAuthorAsync(Author author);

        Task UpdateAuthorAsync(Author author);

        Task DeleteAuthorAsync(int id);


    }
}
