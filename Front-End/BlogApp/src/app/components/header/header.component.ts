import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  username: string | null = null;
  userId: string | null = null;

  constructor(private authorService: AuthorService, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.username = this.authService.getUserName();
    this.userId = this.authService.getUserId();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.username = null;
    this.router.navigateByUrl('home/explore');
  }
  
  deleteAccount(){
    alert("Are you sure about this ?");
    this.authorService.delete(this.userId!).subscribe(
      () => {
        console.log(`Author Deleted Successfully`);
        this.logout();
      }
    )
  }
}
