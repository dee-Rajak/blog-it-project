import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog, BlogData } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'https://localhost:7189/api/BlogPosts';

  constructor(private http: HttpClient) {}

  addBlog(blog: Blog){
    return this.http.post<Blog>(this.apiUrl, blog);
  }

  fetchUserBlogs(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/GetBlogPostByAuthorId/${userId}`);
  }


  updateBlog(id: number, blog: Blog){
    debugger;
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: number){
    debugger;
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
