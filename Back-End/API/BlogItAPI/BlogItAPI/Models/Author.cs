using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BlogItAPI.Models
{
    [Table("Authors")]
    public class Author
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)] 
        public string Email { get; set; }

        public string Password { get; set; }

        [JsonIgnore]
        public ICollection<BlogPost> BlogPosts { get; set; } = new List<BlogPost>();

        [JsonIgnore]
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
