import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { QuillModule } from 'ngx-quill';


@Component({
  selector: 'app-blog-create',
  standalone: true,
  imports: [MarkdownModule, ReactiveFormsModule, CommonModule,QuillModule],
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.css'
})
export class BlogCreateComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  @Input() blogToEdit: Blog | null = null;

  blogForm!: FormGroup;
  categoryList!: Category[];


  constructor(private categoryService: CategoryService, private blogService: BlogService, private authService: AuthService, private router: Router, private http: HttpClient){
    this.getCategories();
  }

  ngOnInit() {
    this.blogForm = new FormGroup({
      title: new FormControl(this.blogToEdit ? this.blogToEdit.Title : '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100)
      ]),
      description: new FormControl(this.blogToEdit ? this.blogToEdit.Description : '', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(300)
      ]),
      content: new FormControl(this.blogToEdit ? this.blogToEdit.Content : '', [
        Validators.required,
        Validators.minLength(50)
      ]),
      featuredImageUrl: new FormControl(this.blogToEdit ? this.blogToEdit.FeaturedImageUrl : '', [
        Validators.pattern('https?://.+')
      ]),
      categoryId: new FormControl(this.blogToEdit ? this.blogToEdit.CategoryId : '', [
        Validators.required
      ])
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      (res: any) => {
        debugger;
        this.categoryList = res;
        debugger;
      }
    )
  }

  onSubmit() {
    if (this.blogForm.valid) {
      
      const blog = {
        Id: this.blogToEdit?.Id,
        Title: this.blogForm.value.title,
        Description: this.blogForm.value.description,
        Content: this.blogForm.value.content,
        FeaturedImageUrl: this.blogForm.value.featuredImageUrl,
        AuthorId: parseInt(this.authService.getUserId() || '0', 10),
        CategoryId: this.blogForm.value.categoryId,
        CreatedDate: new Date().toISOString(),
        UpdatedDate: new Date().toISOString(),
        LikeCount: this.blogToEdit ? this.blogToEdit.LikeCount : 0
      };
      if (this.blogToEdit) {
        this.blogService.updateBlog(this.blogToEdit.Id!, blog).subscribe(
          response => {
            debugger;
            console.log('Blog updated successfully', response);
            this.blogForm.reset();
          }
        );
      } else {
        this.blogService.addBlog(blog).subscribe(
          response => {
            console.log('Blog created successfully', response);
            this.blogForm.reset();
          }
        );
      }
      this.router.navigateByUrl('/home/explore')
    }
  }



  closeForm() {
    this.close.emit();
  }
  
  
}
