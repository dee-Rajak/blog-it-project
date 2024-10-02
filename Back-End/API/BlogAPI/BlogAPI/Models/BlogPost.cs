namespace BlogAPI.Models
{
    public class BlogPost
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Content { get; set; }

        public Guid AuthorId { get; set; }

        public ICollection<BlogPostTag> BlogPostTags { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public Author Author { get; set; }
    }
}
