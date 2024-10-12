import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {
  constructor(private router: Router) {}
  
  navigateToExplore() {
    this.router.navigateByUrl('/home/explore');
  }
}
