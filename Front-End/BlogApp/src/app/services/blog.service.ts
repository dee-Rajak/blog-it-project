import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  updateBlog(id: number, blog: Blog){
    debugger;
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: number){
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  // createBlog(blog: Blog){
  //   // const token = localStorage.getItem('token');
  //   // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.post<Blog>("https://localhost:7189/api/BlogPosts", blog);
  // }
  // getBlogs(){
  //   return this.http.get<BlogData[]>("https://localhost:7189/api/BlogPosts");
  // }
}
