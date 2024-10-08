import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.username = this.authService.getUserName();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
