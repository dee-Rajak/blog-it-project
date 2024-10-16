using BlogItAPI.Data;
using BlogItAPI.Models;
using BlogItAPI.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogItAPI.Repositories.Implementations
{
    public class CategoryRespository : ICategoryRepository
    {
        public readonly AppDbContext _context;

        public CategoryRespository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddCategoryAsync(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if(category!=null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync(string? query = null, string? sortBy = null, string? sortDirection = null, int? pageNumber = 1, int? pageSize = 5)
        {
            //Query
          var categories =   _context.Categories.AsQueryable();


            //Filtering 

            if(string.IsNullOrWhiteSpace(query)==false)
            {
                categories = categories.Where(x=>x.Name.Contains(query));
            }


            //Sorting 
            if(string.IsNullOrWhiteSpace(sortBy) ==false)
            {
                if(string.Equals(sortBy,"Name",StringComparison.OrdinalIgnoreCase))
                {
                    var isAsc = string.Equals(sortDirection, "asc", StringComparison.OrdinalIgnoreCase) ? true : false;

                    categories = isAsc ? categories.OrderBy(x => x.Name) : categories.OrderByDescending(x => x.Name);
                }
            }

            //Pagination 

            var skipResult = (pageNumber - 1) * pageSize;

            categories = categories.Skip(skipResult?? 0).Take(pageSize?? 1);




            return await categories.ToListAsync();

            //return await _context.Categories.ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetCategoryAsync()
        {
            return await _context.Categories.ToListAsync();
        }

            public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task UpdateCategoryAsync(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }
    }
}
