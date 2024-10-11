import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BlogCreateComponent } from '../../components/blog-create/blog-create.component';
import { AuthService } from '../../services/auth.service';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [JsonPipe, BlogCreateComponent, CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit{
  userBlogs: any[] = [];
  blogToEdit: Blog | null = null;

  constructor(private http: HttpClient, private authService: AuthService, private blogService: BlogService) {}
  
  ngOnInit() {
    this.fetchUserBlogs();
  }

  fetchUserBlogs() {
    const userId = this.authService.getUserId();
    this.blogService.fetchUserBlogs(userId!).subscribe(
      (blogs: any[]) => {
        this.userBlogs = blogs;
      });
  }


  editBlog(blog: any) {
    this.blogToEdit = blog;
  }

  deleteBlog(blogId: number) {
    this.blogService.deleteBlog(blogId).subscribe(
      () => {
        console.log(`Blog with ID ${blogId} deleted successfully`);
        this.userBlogs = this.userBlogs.filter(blog => blog.Id !== blogId);
      }
    );
  }
  getCategories(){
    this.http.get()
  }

  showBlogForm = false;

  openBlogForm() {
    this.showBlogForm = true;
  }

  closeBlogForm() {
    this.showBlogForm = false;
  }
}
