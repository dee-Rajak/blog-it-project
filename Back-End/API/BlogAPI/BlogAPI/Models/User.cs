namespace BlogAPI.Models
{
    public class User
    {
        public Guid Id { get; set; } 
        public string UserName { get; set; }

        public string Password { get; set; }

        public ICollection<BlogPost> BlogPosts { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
