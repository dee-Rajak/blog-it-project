import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
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
        Name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        Email: new FormControl('',[Validators.required, Validators.email]),
        Password: new FormControl('', [Validators.required])
      }
    );
    this.loginForm = new FormGroup({
        Email: new FormControl('', [Validators.required, Validators.email]),
        Password: new FormControl('', [Validators.required])
      });
  }

  navigateToDashboard(){
    this.router.navigateByUrl('/home/dashboard');
  }

  onRegister() {
    if (this.authorForm.valid) {
      const author: Author = this.authorForm.value;
      this.authorService.registerAuthor(author).subscribe((res: Author) => {
        console.log('Author registered successfully', res);
        alert("Registered Succesfully, Now Login");
        this.authorForm.reset();
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
