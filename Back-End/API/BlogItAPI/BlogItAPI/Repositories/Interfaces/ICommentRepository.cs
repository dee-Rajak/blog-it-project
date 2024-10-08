﻿using BlogItAPI.Models;

namespace BlogItAPI.Repositories.Interfaces
{
    public interface ICommentRepository
    {
        Task<IEnumerable<Comment>> GetAllCommentsAsync();

        Task<Comment> GetCommentByIdAsync(int id);

        Task AddCommentAsync(Comment comment);

        Task UpdateCommentAsync(Comment comment);

        Task DeleteCommentAsync(int id);
    }
}