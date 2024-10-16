using BlogItAPI.Data;
using BlogItAPI.Models;
using BlogItAPI.Repositories.Implementations;
using BlogItAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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

        public async Task<IActionResult> GetBlogPosts([FromQuery] string? query, [FromQuery] string? sortBy, [FromQuery] string? sortDirection, [FromQuery] int? pageNumber, [FromQuery] int? pageSize)
        {
            var blogPosts = await _blogPostRepository.GetAllBlogPostsAsync(query, sortBy, sortDirection, pageNumber,pageSize);
            return Ok(blogPosts);
        }

        [HttpGet("GetBlogPostByAuthorId/{id}")]
        public async Task<IActionResult> GetBlogPostByAuthorId(int? id)
        {
            var blogs = await _blogPostRepository.GetBlogPostByAuthorId(id);
            if (blogs == null)
            {
                return NotFound();
            }
            return Ok(blogs);
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
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateBlogPost(BlogPost blogPost)
        {
            var authorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (authorIdClaim == null || !int.TryParse(authorIdClaim.Value, out var authorId))
            {
                return Unauthorized("Author not found.");
            }
            blogPost.AuthorId = authorId;
            await _blogPostRepository.AddBlogPostAsync(blogPost);
            await _context.SaveChangesAsync();  
            return CreatedAtAction(nameof(GetBlogPostById), new { id = blogPost.Id }, blogPost);
        
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBlogPost(int id, BlogPost blogPost)
        {
            Console.WriteLine($"URL id: {id}, BlogPost id: {blogPost.Id}");

            if (id != blogPost.Id)
            {
                return BadRequest();
            }
            await _blogPostRepository.UpdateBlogPostAsync(blogPost);
            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlogPost(int id)
        {
            await _blogPostRepository.DeleteBlogPostAsync(id);
            return NoContent();
        }
        [Authorize]
        [HttpPost("{id}/like")]

        public async Task<IActionResult> LikePost(int authorId,int blogPostId)
        {
            await _blogPostRepository.LikePostAsync(authorId,blogPostId);
            return NoContent();
        }

        [HttpGet("IsLiked")]
        public async Task<IActionResult> IsLiked(int authorId, int blogPostId)
        {
            var liked = await _blogPostRepository.IsLikedAsync(authorId,blogPostId);
            return Ok(liked);
        }

    
    }
}
