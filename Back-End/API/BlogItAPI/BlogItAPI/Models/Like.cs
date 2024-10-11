using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BlogItAPI.Models
{
    [Table("Likes")]
    public class Like
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("BlogPost")]
        public int BlogPostId { get; set; }

        [JsonIgnore]
        public BlogPost? BlogPost { get; set; }

        [ForeignKey("Author")]

        
        public int AuthorId { get; set; }

        [JsonIgnore]
        public Author? Author {  get; set; }     
    }
}
