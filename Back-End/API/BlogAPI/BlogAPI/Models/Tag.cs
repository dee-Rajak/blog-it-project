﻿namespace BlogAPI.Models
{
    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<BlogPostTag> BlogPostTag { get; set; }
    }
}