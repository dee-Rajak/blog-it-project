import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  http = inject(HttpClient);
  router = inject(Router)

  authorForm: FormGroup;
  loginForm: FormGroup;

  constructor(private authorService: AuthorService, private authService: AuthService){
    this.authorForm = new FormGroup(
      {
        Name: new FormControl(''),
        Email: new FormControl(''),
        Password: new FormControl('')
      }
    );
    this.loginForm = new FormGroup({
        Name: new FormControl(''),
        Email: new FormControl(''),
        Password: new FormControl('')
      });
  }

  onRegister() {
    if (this.authorForm.valid) {
      const author: Author = this.authorForm.value;
      this.authorService.registerAuthor(author).subscribe((res: Author) => {
        console.log('Author registered successfully', res);
        alert("Registered Succesfully, Now Login");
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          debugger;
          console.log('Login Successful');
          debugger;
          this.navigateToDashboard();
        }
      )
    }
  }

  navigateToDashboard(){
    this.router.navigateByUrl('/home/dashboard');
  }


  // onLogin(){
  //   // debugger;
  //   this.http.post("https://freeapi.miniprojectideas.com/api/User/Login", this.loginObj).subscribe(
  //     (res: any)=>{
  //       if(res.result) {
  //         alert("Login Successful")
  //         localStorage.setItem('UserToken', res.data.token)
  //         this.router.navigateByUrl('home/dashboard')
  //       } else {
  //         alert("Login Failed")
  //       }
  //     }
  //   )
  // }
}

export interface AuthCredentials {
  Name: string;
  Email: string;
  Password: string;
}

/*
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service'; // Import AuthService

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.fetchSecureData();
  }

  fetchSecureData() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('https:', { headers }).subscribe(
      (response: any) => {
        console.log('Secure data fetched', response);
      },
      (error: any) => {
        console.error('Error fetching secure data', error);
      }
    );
  }
}
 */