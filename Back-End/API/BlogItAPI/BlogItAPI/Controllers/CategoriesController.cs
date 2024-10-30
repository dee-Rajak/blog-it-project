using BlogItAPI.Models;
using BlogItAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlogItAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categorRepository;

        public CategoriesController(ICategoryRepository categorRepository)
        {
            _categorRepository = categorRepository;
        }

        [HttpGet("pageCateogry")]
        public async Task<IActionResult> GetCategories([FromQuery] string? query, [FromQuery] string? sortBy, [FromQuery] string? sortDirection, [FromQuery] int? pageNumber, [FromQuery] int? pageSize)
        {
            var categories = await _categorRepository.GetCategoriesAsync(query,sortBy,sortDirection,pageNumber,pageSize);
            return Ok(categories);
        }
        [HttpGet("getCategories")]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categorRepository.GetCategoryAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory(Category category)
        {
            await _categorRepository.AddCategoryAsync(category);
            return CreatedAtAction(nameof(GetCategoryId), new { id = category.Id }, category);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryId(int id)
        {
            var category = await _categorRepository.GetCategoryByIdAsync(id);
            if(category == null)
            {
                return NotFound();
            }
            return Ok(category);    
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, Category category)
        {
            if(id!=category.Id)
            {
                return BadRequest();
            }

            await _categorRepository.UpdateCategoryAsync(category);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            await _categorRepository.DeleteCategoryAsync(id);
            return NoContent();
        }
    }
}
