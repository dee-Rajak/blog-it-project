using BlogItAPI.Models;
using BlogItAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogItAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly IAuthorRepository _authorRepository;
        

        public AuthorsController(IAuthorRepository authorRepository)
        {
            _authorRepository = authorRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAuthors()
        {
            var authors = await _authorRepository.GetAllAuthorsAsync();
            return Ok(authors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthorById(int id)
        {
            var author = await _authorRepository.GetAuthorByIdAsync(id);
            if (author == null)
            {
                return NotFound();
            }

            return Ok(author);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAuthor(Author author)
        {
            await _authorRepository.AddAuthorAsync(author);
            return CreatedAtAction(nameof(GetAuthorById), new { id = author.Id }, author);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateAuthor(int id, Author author)
        {
            if(id!=author.Id)
            {
                return BadRequest();
            }

            await _authorRepository.UpdateAuthorAsync(author);
            return NoContent();
        }

        [HttpDelete("{id}")]
        
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            await _authorRepository.DeleteAuthorAsync(id);
            return NoContent();
        }


        [HttpGet("by-author/{authorId}")]
        public async Task<IActionResult> GetBlogPostByAuthorId(int authorId)
        {
            var blogPosts = await _authorRepository.GetBlogPostsByAuthorIdAsync(authorId);

            if(blogPosts == null)
            {
                return NotFound();
            }

            return Ok(blogPosts);
        }
    }
}
