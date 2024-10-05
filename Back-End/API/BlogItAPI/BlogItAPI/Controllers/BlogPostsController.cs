using BlogItAPI.Data;
using BlogItAPI.Models;
using BlogItAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace BlogItAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IBlogPostRepository _blogPostRepository;
        private readonly AppDbContext _context;

        public BlogPostsController(IBlogPostRepository blogPostRepository,AppDbContext context)
        {
            _blogPostRepository = blogPostRepository;
            _context = context;
        }

        [HttpGet]

        public async Task<IActionResult> GetBlogPosts()
        {
            var blogPosts = await _blogPostRepository.GetAllBlogPostsAsync();
            return Ok(blogPosts);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetBlogPostById(int id)
        {
            var blogPosts = await _blogPostRepository.GetBlogPostByIdAsync(id);
            if (blogPosts == null)
            {
                return NotFound();
            }
            return Ok(blogPosts);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBlogPost(BlogPost blogPost)
        {
            await _blogPostRepository.AddBlogPostAsync(blogPost);
            await _context.SaveChangesAsync();  
            return CreatedAtAction(nameof(GetBlogPostById), new { id = blogPost.Id }, blogPost);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateBlogPost(int id, BlogPost blogPost)
        {
            if (id != blogPost.Id)
            {
                return BadRequest();
            }
            await _blogPostRepository.UpdateBlogPostAsync(blogPost);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPost(int id)
        {
            await _blogPostRepository.DeleteBlogPostAsync(id);
            return NoContent();
        }

        [HttpPost("{id}/like")]

        public async Task<IActionResult> LikePost(int id)
        {
            await _blogPostRepository.LikePostAsync(id);
            return NoContent();
        }

    
    }
}
