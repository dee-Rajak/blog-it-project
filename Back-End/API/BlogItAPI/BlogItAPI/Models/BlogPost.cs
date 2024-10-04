using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BlogItAPI.Models
{
    [Table("BlogPosts")]
    public class BlogPost
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title {  get; set; }

        public string Description { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

        public int Likes { get; set; }

        [ForeignKey("Authors")]
        public int AuthorId { get; set; }
        public Author? Author { get; set; }

        public ICollection<Comment> Comments { get; set; } = new List<Comment>();

        public ICollection<Category> Categories { get; set; } = new List<Category>();

        

    }
}
