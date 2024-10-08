import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BlogCreateComponent } from '../../components/blog-create/blog-create.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [JsonPipe, BlogCreateComponent, CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  
  showBlogForm = false;

  openBlogForm() {
    this.showBlogForm = true;
  }

  closeBlogForm() {
    this.showBlogForm = false;
  }
}
