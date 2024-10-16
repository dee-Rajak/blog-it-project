import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './team-page.component.html',
  styleUrl: './team-page.component.css'
})
export class TeamPageComponent implements OnInit {
  ngOnInit(): void {}

  teamMembers = [
    { name: 'Dhireen Kr. Rajak', photo: 'assets/images/photo1.jpg' },
    { name: 'Nancy Saini', photo: 'assets/images/photo2.jpeg' },
    { name: 'Saurav Kumar', photo: 'assets/images/photo3.jpeg' },
  ];
}
