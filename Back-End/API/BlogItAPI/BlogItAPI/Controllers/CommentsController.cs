using BlogItAPI.Models;
using BlogItAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;

namespace BlogItAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private ICommentRepository _commentRepository;

        public CommentsController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetComments()
        {
            var comments = await _commentRepository.GetAllCommentsAsync();
            return Ok(comments);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetCommentById(int id)
        {
            var comment = await _commentRepository.GetCommentByIdAsync(id);
            if(comment == null)
            {
                return NotFound();
            }
            return Ok(comment); 
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment(Comment comment)
        {
            await _commentRepository.AddCommentAsync(comment);
            return CreatedAtAction(nameof(GetCommentById), new { id = comment.Id }, comment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(int id, Comment comment)
        {
            if(id!=comment.Id)
            {
                return BadRequest();
            }

            await _commentRepository.UpdateCommentAsync(comment);
            return NoContent();
        }


        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteComment(int id)
        {
            await _commentRepository.DeleteCommentAsync(id);
            return NoContent();
        }

    }
}
