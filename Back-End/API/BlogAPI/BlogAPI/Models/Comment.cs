namespace BlogAPI.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt {  get; set; }
        public int BlogPostId { get; set; }
        public BlogPost BlogPost { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
