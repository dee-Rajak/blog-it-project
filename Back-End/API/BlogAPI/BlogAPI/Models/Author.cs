namespace BlogAPI.Models
{
    public class Author
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public ICollection<BlogPost> BlogPosts { get; set; }
    }
}
