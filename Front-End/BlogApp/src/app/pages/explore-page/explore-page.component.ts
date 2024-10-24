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
import { ToastrService } from 'ngx-toastr';

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
  categories: any[] = [];

  query: string = '';
  sortBy: string = 'CreatedDate';
  sortDirection: string = 'Dsc';
  pageNumber: number = 1;
  pageSize: number = 3;
  selectedCategoryId: number | null = null;

  constructor(private toastr: ToastrService, private blogService: BlogService, private categoryService: CategoryService, private authService: AuthService, private authorService: AuthorService, private http: HttpClient) {
    this.searchBlogs();
  }

  ngOnInit(): void {
    this.searchBlogs();
    this.loadCategories();
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

  loadCategories() {
    debugger;
    this.categoryService.getCategories().subscribe(categories => {
      debugger;
      this.categories = categories;
    });
  }

  filterByCategory(categoryId: number, categroyName: string) {
    this.query = categroyName;
    this.searchBlogs();
  }

  share(platform: string, blog: BlogData) {
    const url = `https://localhost:7189/api/BlogPosts/${blog.Id}`; 
    const title = blog.Title;
    const description = blog.Description;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'instagram':

        window.open(`https://www.instagram.com/?url=${encodeURIComponent(url)}`, '_blank');
        // alert('Please copy the link and share it in your Instagram story or post.');
        this.toastr.info("Please copy the link and share it in your Instagram story or post.");
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  }

  copyToClipboard(blog: BlogData) {
    const url = `https://localhost:7189/api/BlogPosts/${blog.Id}`;
    navigator.clipboard.writeText(url).then(() => {
      // alert('Link copied to clipboard!');
      this.toastr.success("Link copied to clipboard");
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

}
