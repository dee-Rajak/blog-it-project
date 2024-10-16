using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BlogItAPI.Models
{
    [Table("Categories")]
    public class Category
    {
        [Key]
        public int Id { get; set; }

       
        public string? Name { get; set; }    

        public string? Description { get; set; }

        [JsonIgnore]

        public ICollection<BlogPost> BlogPosts { get; set; } = new List<BlogPost>();   
    }
}
