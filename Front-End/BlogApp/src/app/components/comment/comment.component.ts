import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  @Input() blogPostId!: number;
  comments: Comment[] = [];
  commentForm!: FormGroup;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.commentForm = new FormGroup({
      content: new FormControl('')
    });
    this.loadComments();
  }

  loadComments() {
    this.http.get<Comment[]>(`https://localhost:7189/api/Comments/GetCommentsByBlogId/${this.blogPostId}`).subscribe(
      (comments: Comment[]) => {
        console.log('Comments loaded:', comments);
        this.comments = comments;
        this.comments.forEach(comment => {
          this.http.get<any>(`https://localhost:7189/api/Authors/${comment.CommentAuthorId}`).subscribe(
            author => {
              debugger;
              comment.CommentAuthorName = author.Name;
              debugger;
              console.log('Author name fetched for comment:', comment);
            });
        });
      });
      console.log(this.comments);
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        Content: this.commentForm.value.content,
        CreatedDate: new Date(),
        BlogPostId: this.blogPostId,
        CommentAuthorId: parseInt(this.authService.getUserId() || '0', 10)
      };
      debugger;
      this.http.post('https://localhost:7189/api/Comments', newComment).subscribe(
        () => {
          this.commentForm.reset();
          this.loadComments();
        },
      );
    }
  }
}

export interface Comment {
  Content: string;
  CreatedDate: Date;
  BlogPostId: number;
  CommentAuthorId: number;
  CommentAuthorName?: string;
}