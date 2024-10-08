import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [MarkdownModule, ReactiveFormsModule],
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.css'
})
export class BlogCreateComponent implements OnInit{
  @Output() close = new EventEmitter<void>();

  blogForm!: FormGroup;

  constructor(private blogService: BlogService, private authService: AuthService, private router: Router){}

  ngOnInit() {
    this.blogForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      content: new FormControl(''),
      featuredImageUrl: new FormControl(''),
      // authorId: new FormControl(''),
      categoryId: new FormControl('')
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blog = new Blog(
        this.blogForm.value.title,
        this.blogForm.value.description,
        this.blogForm.value.content,
        this.blogForm.value.featuredImageUrl,
        // this.blogForm.value.authorId,
        parseInt(this.authService.getUserId() || '0', 10),
        this.blogForm.value.categoryId
      );
      
      debugger;
      console.log('Blog data:', blog);
      this.blogService.createBlog(blog).subscribe(
        (response: Blog) => {
        console.log('Blog created successfully', response);
        this.blogForm.reset();
      });
    }
    this.router.navigateByUrl('/home/explore');
  }

  closeForm() {
    this.close.emit();
  }
}
