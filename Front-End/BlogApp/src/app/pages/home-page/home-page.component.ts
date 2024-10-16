import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  navigateToExplore() {
    this.router.navigateByUrl('/home/explore');
  }

  navigateToDashboard() {
    this.router.navigateByUrl('/home/dashboard');
  }
}
