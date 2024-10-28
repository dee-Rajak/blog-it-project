import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css'
})
export class LikeComponent implements OnInit {
  @Input() authorId!: number;
  @Input() blogPostId!: number;
  @Input() likes!: number;

  liked = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.checkIfLiked();
  }

  checkIfLiked() {
    const url = `https://localhost:7189/api/BlogPosts/IsLiked?authorId=${this.authorId}&blogPostId=${this.blogPostId}`;
    debugger;
    this.http.get<boolean>(url).subscribe(
      (isLiked) => {
        this.liked = isLiked;
        debugger;
      }
    );
  }

  toggleLike() {
    const url = `https://localhost:7189/api/BlogPosts/${this.blogPostId}/like?authorId=${this.authorId}&blogPostId=${this.blogPostId}`;
    if (this.liked) {
      debugger;
      this.http.post(url, {}).subscribe(
        () => {
          this.likes--;
          this.liked = false;
          debugger;
          console.log('Blog unliked successfully');
        }
      );
    } else {
      debugger;
      this.http.post(url, {}).subscribe(
        () => {
          this.likes++;
          this.liked = true;
          debugger;
          console.log('Blog liked successfully');
        }
      );
    }
  }
}
