import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { AuthorService } from '../../services/author.service';
import { BlogData } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommentComponent } from '../../components/comment/comment.component';
import { LikeComponent } from '../../components/like/like.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [LikeComponent, JsonPipe, CommonModule, MarkdownModule, CommentComponent, FormsModule],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css'
})

export class ExplorePageComponent {
  selectedBlog: any = null;
  blogList: BlogData[] = [];
  userId: any;


  query: string = '';
  sortBy: string = 'CreatedDate';
  sortDirection: string = 'Asc';
  pageNumber: number = 1;
  pageSize: number = 6;

  constructor(private blogService: BlogService, private categoryService: CategoryService, private authService: AuthService, private authorService: AuthorService, private http: HttpClient){
    this.searchBlogs();
  }

  ngOnInit(): void {
    this.searchBlogs();
    // this.getBlogs();
  }


  showContent(blog: BlogData) {
    this.selectedBlog = blog;
    this.userId = this.authService.getUserId();
  }

  closeContent() {
    this.selectedBlog = null;
    this.searchBlogs();
  }

  searchBlogs() {
    const params = {
      query: this.query,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };

    this.http.get<BlogData[]>("https://localhost:7189/api/BlogPosts", { params }).subscribe(
      (res: BlogData[]) => {
        debugger;
        this.blogList = res;
        this.blogList.forEach(blog => {
          this.authorService.getAuthorName(blog.AuthorId).subscribe(author => {
            blog.AuthorName = author.Name;
          });
          this.categoryService.getCategoryById(blog.CategoryId).subscribe(category => {
            blog.CategoryName = category.Name;
          });
        });
      }
    );
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'Asc' ? 'Dsc' : 'Asc';
    this.searchBlogs();
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.searchBlogs();
    }
  }
  nextPage() {
    this.pageNumber++;
    this.searchBlogs();
  }

  hasMoreBlogs(): boolean {
    return this.blogList.length === this.pageSize;
  }
}
