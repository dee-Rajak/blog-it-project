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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkIfLiked();
  }

  checkIfLiked() {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    debugger;
    this.liked = likedPosts.includes(this.blogPostId);
  }

  toggleLike() {
    const url = `https://localhost:7189/api/BlogPosts/${this.blogPostId}/like?authorId=${this.authorId}&blogPostId=${this.blogPostId}`;
    if (this.liked) {
      debugger;
      this.http.post(url, {}).subscribe(
        () => {
          this.likes--;
          this.liked = false;
          this.updateLikedPosts();
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
          this.updateLikedPosts();
          debugger;
          console.log('Blog liked successfully');
        }
      );
    }
  }

  updateLikedPosts() {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (this.liked) {
      likedPosts.push(this.blogPostId);
      debugger;
    } else {
      likedPosts = likedPosts.filter((id: number) => id !== this.blogPostId);
      debugger;
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    debugger;
  }

  // likeBlog() {
  //   const url = `https://localhost:7189/api/BlogPosts/${this.blogPostId}/like?authorId=${this.authorId}&blogPostId=${this.blogPostId}`;
  //   debugger;
  //   this.http.post(url, {}).subscribe(
  //     (res: any) => {
  //       debugger;
  //       this.likes++;
  //       console.log('Blog liked successfully', res);
  //     }
  //   );
  // }
}
