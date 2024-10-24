import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { AuthorService } from '../../services/author.service';
import { Blog, BlogData } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';
import { FormsModule } from '@angular/forms';
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
export class ExplorePageComponent implements OnInit {
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
  }

  showContent(blog: BlogData) {
    this.selectedBlog = blog;
    this.userId = this.authService.getUserId();
    this.setOpenGraphTags(blog);
  }

  setOpenGraphTags(blog: BlogData) {
    const head = document.getElementsByTagName('head')[0];

    // Remove existing Open Graph tags
    const existingTags = head.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]');
    existingTags.forEach(tag => head.removeChild(tag));

    // Open Graph tags
    const titleTag = document.createElement('meta');
    titleTag.setAttribute('property', 'og:title');
    titleTag.setAttribute('content', blog.Title);
    head.appendChild(titleTag);

    const descriptionTag = document.createElement('meta');
    descriptionTag.setAttribute('property', 'og:description');
    descriptionTag.setAttribute('content', blog.Description);
    head.appendChild(descriptionTag);

    const imageTag = document.createElement('meta');
    imageTag.setAttribute('property', 'og:image');
    imageTag.setAttribute('content', blog.FeaturedImageUrl);
    head.appendChild(imageTag);

    const urlTag = document.createElement('meta');
    urlTag.setAttribute('property', 'og:url');
    urlTag.setAttribute('content', `https://localhost:7189/api/BlogPosts/${blog.Id}`);
    head.appendChild(urlTag);

    // Twitter Card tags
    const twitterTitleTag = document.createElement('meta');
    twitterTitleTag.setAttribute('name', 'twitter:title');
    twitterTitleTag.setAttribute('content', blog.Title);
    head.appendChild(twitterTitleTag);

    const twitterDescriptionTag = document.createElement('meta');
    twitterDescriptionTag.setAttribute('name', 'twitter:description');
    twitterDescriptionTag.setAttribute('content', blog.Description);
    head.appendChild(twitterDescriptionTag);

    const twitterImageTag = document.createElement('meta');
    twitterImageTag.setAttribute('name', 'twitter:image');
    twitterImageTag.setAttribute('content', blog.FeaturedImageUrl);
    head.appendChild(twitterImageTag);

    const twitterCardTag = document.createElement('meta');
    twitterCardTag.setAttribute('name', 'twitter:card');
    twitterCardTag.setAttribute('content', 'summary_large_image'); 
    head.appendChild(twitterCardTag);
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
      pageNumber: this.pageNumber.toString(), // Ensure these are strings
      pageSize: this.pageSize.toString()
    };

    this.http.get<BlogData[]>("https://localhost:7189/api/BlogPosts", { params }).subscribe(
      (res: BlogData[]) => {
        this.blogList = res;
        this.blogList.forEach(blog => {
          this.authorService.getAuthorName(blog.AuthorId).subscribe(author => {
            blog.AuthorName = author.Name;
          });
          this.categoryService.getCategoryById(blog.CategoryId).subscribe(category => {
            blog.CategoryName = category.Name;
          });
        });
      },
      error => {
        console.error('Error fetching blogs:', error);
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
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  filterByCategory(categoryId: number, categoryName: string) {
    this.query = categoryName;
    this.searchBlogs();
  }

  share(platform: string, blog: BlogData) {
    const url = `https://localhost:7189/api/BlogPosts/${blog.Id}`;
    const title = encodeURIComponent(blog.Title);
    const description = encodeURIComponent(blog.Description);
    const imageUrl = encodeURIComponent(blog.FeaturedImageUrl); // Blog featured image URL
    const hashtags = 'Blogit'; // Modify as needed

    switch (platform) {
        case 'twitter':
            // Format the tweet text to include title, description, and image URL
            const twitterText = `${title}%0A- ${description}%0A${url}`;
            const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText}%0A&hashtags=${hashtags}`;
            window.open(twitterUrl, '_blank');
            break;

        case 'share':
            const shareText = `${title} - ${description} ${url} ${imageUrl}`; 
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: shareText,
                    url: url,
                })
                .then(() => console.log('Shared successfully!'))
                .catch((error) => {
                    console.error('Error sharing:', error);
                    this.toastr.warning('Sharing not supported in your browser');
                });
            } else {
                this.toastr.warning('Sharing not supported in your browser');
            }
            break;

        default:
            this.copyToClipboard(blog.Id); // Ensure the URL is passed as a string
            this.toastr.success('URL copied to clipboard! You can now paste it where you want to share.');
    }
}


  copyToClipboard(blogId: number) {
    // Check if the blogId is valid
    if (!blogId) {
        alert('Blog ID is invalid.');
        return;
    }

    const url = `https://localhost:7189/api/BlogPosts/${blogId}`;
    console.log('Copying URL:', url); // Log the URL being copied

    navigator.clipboard.writeText(url).then(() => {
        this.toastr.success('Link Copied to clipbaord!')
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

  
  
}
