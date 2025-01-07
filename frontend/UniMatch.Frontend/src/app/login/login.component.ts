import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../registration/registration.output.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="main-div">
      <div class="one-more-div">
        <div class="auth-header">
          <h1>Login</h1>
          <img class="logo" src="logo2.png" alt="Logo" />
          <p>Welcome back!</p>
        </div>
        <div class="auth-wrapper">
          <form method="post" [formGroup]="loginForm" (ngSubmit)="login()" class="form">
          <div class="auth-inner">
            <div class="input-div">
              <input class="input" id="email" type="text" name="email" formControlName="email" placeholder="Email"/>
              <i class="fa-solid fa-at"></i>
            </div>
            <div class="input-div">
              <input class="input" id="password" type="password" name="password" formControlName="password" placeholder="Password"/>
              @if(dots) {
                <i class="fa-solid fa-eye" id="eye1" (click)="showNew()"></i>
              } @else {
                <i class="fa-solid fa-eye-slash" id="eye1" (click)="showNew()"></i>
              }
              <i class="fa-solid fa-key"></i>
            </div>
          </div>
          <div class="checkbox-div">
            <input type="checkbox" id="rememberMe" name="rememberMe" formControlName="rememberMe"/>
            <label for="rememberMe">Remember me</label>
          </div>
          <div>
            <button class="button" type="submit" >Log In!</button>
          </div>
          </form>
          <div class="register-div">
           <p>Don't have an account? <a routerLink="/register" class="link">Register!</a></p>
          </div>
          <!--<div>
            <p><a routerLink="/newpassword" class="link" id="forgotPassword">Forgot your password?</a></p>
          </div>-->
        </div>
      </div>
    </div>
  `,
  styles: `
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .logo {
    height: 110px;
    width: auto;
  }

  .main-div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    gap: 20px;
    background-color:white;
  }

  .one-more-div {
    border: solid 1px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    border-radius: 10px;
    width: 550px;
    height: 500px;
    justify-content: center;
    align-items: center;
    background-color: #f7f7f7;
    box-shadow: 0 0 15px rgba(105, 173, 250, 0.6);
  }

  .auth-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0px;
  }

  .auth-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #rememberMe {
    margin-left: 5px;
    margin-right: 5px;
    cursor: pointer;
  }

  .checkbox-div {
    display: flex;
    flex-direction: row;
    gap: 5px;
    margin: 5px;
  }

  .auth-inner {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input-div {
    display: flex;
    flex-direction: row;
    gap: 5px;
    position: relative;
  }

  .input-div i {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #888;
    font-size: 18px;
  }

  input {
    border-style: solid;
    border-width: 1px;
    border-color: #E0E0E0;
    border-radius: 10px;
    padding: 5px;
    margin: 5px;
    background-color: #FFFFFF;
    font-family: 'Poppins';
    cursor: text;
  }

  .input {
    width: 300px;
    height: 30px;
    font-size: 16px;
  }

  .input:focus {
    outline: none;
    border-color: #5cb6f9;
  }

  h1, label, p, a {
    font-family: 'Poppins';
    color: #1A1A1A;
    margin: 0px;
  }

  .button {
      border-style: solid;
      border-width: 1px;
      border-color: #FFE0B2 ;
      border-radius: 5px;
      padding: 5px;
      margin: 5px;
      background-color: #5cb6f9;
      width: 300px;
      height: 30px;
      font-size: 16px;
      font-family: 'Poppins';
      cursor: pointer;
  }

  .button:hover {
    background-color:rgb(42, 175, 247);
  }

  #forgotPassword {
    color: #12229d;
    font-weight: bold;
  }

  #forgotPassword:hover {
    color: grey;
  }

  .link {
      text-decoration: none;
      color: black;
    }

  .link:hover {
    color: #5cb6f9;
    text-decoration: underline;
  }

  #eye1{
    cursor: pointer;
    color: #888;
    font-size: 18px;
    position: absolute;
    top: 50%;
    right: 35px;
    transform: translateY(-50%);
  }

  .register-div {
    margin-top: 15px;
  }
  `
})
export class LoginComponent implements OnInit{

  dots: boolean = true;

  user: User | null = null;
  authService = inject(AuthService);

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
     next: (user) => {this.user=user}
    })
  }

  protected loginForm = this.fb.group({
    email: new FormControl(),
    password: new FormControl(),
    rememberMe: new FormControl()
  })

  login() {
    console.log(this.loginForm.value);
   /* this.http.post<any>('/api/login', { email: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value, rememberMe: this.loginForm.controls['rememberMe'].value })
      .subscribe(res => {
        // next: () => {
        this.router.navigate(['/']);
        localStorage.setItem('jwt', res.token);
       
        
        // },
        // error: error => {
        //   alert("Netočan email ili lozinka!");
        // }
      });
      */
      this.authService.login(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value,
        this.loginForm.controls['rememberMe'].value).subscribe({
          next : (user) => {
            this.router.navigate(['/']);
          
        },
        error: (err) => {
          alert("Netočan email ili lozinka");
        }
      }
      );
  }

  showNew() {
    var x = document.getElementById("password") as HTMLInputElement;
    if (x!.type === "password") {
      x.type = "text";
      this.dots = false;
    } else {
      x.type = "password";
      this.dots = true;
    }
  }
}
