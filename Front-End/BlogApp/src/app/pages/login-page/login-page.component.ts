import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../models/author.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private authorService: AuthorService, private authService: AuthService, private toastr: ToastrService) {
    this.authorForm = new FormGroup(
      {
        Name: new FormControl('', [Validators.required, Validators.minLength(4)]),
        Email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        Password: new FormControl('', [Validators.required, Validators.minLength(8)])
      }
    );
    this.loginForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      // Password: new FormControl('', [Validators.required])
      Password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  navigateToDashboard() {
    this.router.navigateByUrl('/home/dashboard');
  }

  onRegister() {
    if (this.authorForm.valid) {
      const author: Author = this.authorForm.value;
      this.authorService.registerAuthor(author).subscribe({
        next: (res: Author) => {
          debugger;
          console.log('Author registered successfully', res);
          // alert("Registered Succesfully, Now Login");
          this.toastr.success("You may login now. 😊", "Registration Successfull", {
            timeOut: 5000,
          });
          this.authorForm.reset();
        },
        error: (error) => {
          debugger;
          this.toastr.error(error.error, "Registration Error", {
            timeOut: 5000,
          });
          // alert(error.error);
          // this.toastrService.error('everything is broken', 'Major Error', {
          //   timeOut: 3000,
          // });
        }
      });
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          debugger;
          if (response.Token) {
            debugger;
            localStorage.setItem('token', response.Token);
            localStorage.setItem('userId', response.Id.toString());
            localStorage.setItem('userName', response.Name);
          }
          debugger;
          console.log('Login Successful');
          debugger;
          this.navigateToDashboard();
        },
        error: (error) => {
          debugger;
          this.toastr.error(error.error, "Login Error", {
            timeOut: 5000,
          });
          // alert(error.error);
        }
      })
    }
  }

}

export interface AuthCredentials {
  Email: string;
  Password: string;
}
