import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {
  constructor(private router: Router) {}
  
  navigateToExplore() {
    this.router.navigateByUrl('/home/explore');
  }
}
