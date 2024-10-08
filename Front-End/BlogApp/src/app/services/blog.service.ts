import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog, BlogData } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  createBlog(blog: Blog){
    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Blog>("https://localhost:7189/api/BlogPosts", blog);
  }
  getBlogs(){
    return this.http.get<BlogData[]>("https://localhost:7189/api/BlogPosts");
  }
}
