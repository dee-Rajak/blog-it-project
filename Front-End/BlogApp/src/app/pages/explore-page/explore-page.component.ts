import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { LineBreakPipe } from '../../pipes/line-break.pipe';
import { MarkdownModule } from 'ngx-markdown';
import { AuthorService } from '../../services/author.service';
import { BlogData } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [LineBreakPipe, JsonPipe, CommonModule, MarkdownModule, FormsModule],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.css'
})

export class ExplorePageComponent {
  selectedBlog: any = null;
  blogList: BlogData[] = [];
  query: string = '';
  sortBy: string = 'CreatedDate';
  sortDirection: string = 'Asc';
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(private blogService: BlogService, private authorService: AuthorService, private http: HttpClient){}

  ngOnInit(): void {
    this.searchBlogs();
    // this.getBlogs();
  }


  showContent(blog: BlogData) {
    this.selectedBlog = blog;
  }

  closeContent() {
    this.selectedBlog = null;
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
            blog.AuthorName = author.Name; // Assuming the author object has a 'name' property
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

  // getBlogs(){
  //   debugger;
  //   this.blogService.getBlogs().subscribe(
  //     (res: BlogData[])=>{
  //       debugger;
  //       this.blogList = res;
  //       this.blogList.forEach(blog => {
  //         this.authorService.getAuthorName(blog.AuthorId).subscribe(author => {
  //           debugger;
  //           blog.AuthorName = author.Name;
  //         });
  //       });
  //     }
  //   );
  // }
}