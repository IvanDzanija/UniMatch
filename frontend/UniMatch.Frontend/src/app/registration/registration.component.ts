import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationService } from './registration.service';
import { Registration } from './registration.output.model';
import { passwordValidator } from '../validators/password.validator';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  template: `
    <div class="main-div">
      <div class="left-side">
        <h1 class="welcome">WELCOME TO</h1>
        <div class="logo-match">
        <img class="logo" src="logo2.png" alt="Logo" />
        <h1 class="heading">UniMatch</h1>
        </div>
  <p class="subheading">Join thousands of students who have found their ideal university destinations!</p>
  <ul class="features">
    <li><div class="bold">Personalized Matches:</div>Get university recommendations based on your interests, career goals, and lifestyle.</li>
    <li><div class="bold">Financial Insights:</div>Discover universities that fit your budget, with detailed financial options.</li>
    <li><div class="bold">Global Opportunities:</div><div>Find universities in top study destinations around the world.</div></li>
    <li><div class="bold">Easy to Use:</div><div>Simple registration and a smooth process to help you make informed decisions.</div></li>
  </ul>
      </div>
      <div class="one-more-div">
        <div>
          <h1 id="title">Sign Up</h1>
        </div>
        <div class="auth-wrapper">
          <form method="post" [formGroup]="registerForm" (ngSubmit)="register()">
          <div class="auth-inner">
            <div class="input-div">
              <input id="email" type="text" name="email" formControlName="email" placeholder="Email"/>
              <i class="fa-solid fa-at"></i>
            </div>
            @if(this.registerForm.controls.email.invalid && this.registerForm.controls.email.touched) {
              <em>Invalid email address.</em>
            } @else {<em></em>} 
            <div class="input-div">
              <input id="username" type="text" name="username" formControlName="username" placeholder="Username"/>
              <i class="fa-solid fa-user"></i>
            </div>
            @if(this.registerForm.controls.username.invalid && this.registerForm.controls.username.touched) {
              <em>Required field.</em>
            } @else {<em></em>}
            <div class="input-div">
              <input id="password" type="password" name="password" formControlName="password" placeholder="Password" id="pass1"/>
              @if(dots) {
                <i class="fa-solid fa-eye" id="eye1" (click)="showPassword()"></i>
              } @else {
                <i class="fa-solid fa-eye-slash" id="eye1" (click)="showPassword()"></i>
              }
              <i class="fa-solid fa-key"></i>
            </div>
            <em *ngIf="registerForm.get('password')?.hasError('password') && registerForm.get('password')?.touched">
              Must contain 8-15 characters, at least 1 letter and 1 number.
            </em>
          </div>
          <!--<div class="role">
            <div class="single-role">
              <input class="input-role" type="radio" name="role" value="admin" formControlName="role" id="admin"/><label for="admin">Admin</label>
            </div>
          </div>-->
          <div>
            <button class="button" type="submit">Sign up!</button>
          </div>
          </form>
          <!--<p class="or">or</p>
          <button class="button" (click)="signInWithGoogle()"><i class="fa-brands fa-google"></i>   Login with Google</button>-->
          <p class="login-text">Already have an account? <a routerLink="/login" class="link">Log In</a></p>
        </div>
      </div>
    </div>
  `,
  styles: `
  .role {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .logo {
    width: 150px;
    height: 150px;
  }

  .logo-match {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .input-role {
    width: 50px;
    height: 20px;
    margin-left: 10px;
  }

  .single-role {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1px;
  }

  .main-div {
    display: grid;
    height: 100vh;
    grid-template-columns: 1fr 1fr;
  }

  .one-more-div {
    justify-self: center;
    align-self: center;
  }

body, h1, p, ul {
  margin: 0;
  padding: 0;
  font-family: 'Poppins';
}

.bold {
  font-weight: bold;
}

.left-side {
  background-color: #12229d;
  color: #FFFFFF;
  padding-right: 50px;
  padding-left: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.left-side .welcome {
  font-size: 64px;
  font-weight: 100;
  margin-bottom: 10px;
}

.left-side .heading {
  font-size: 48px;
  font-weight: 100;
  margin-bottom: 10px;

}

.left-side .subheading {
  font-size: 20px;
  font-weight: 300; 
  margin-bottom: 30px;
  margin-top: 20px;
  line-height: 1.5;
  max-width: 400px; 
}

.left-side .features {
  list-style-type: none;
  margin-bottom: 30px;
}

.left-side .features li {
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 10px;
}

.login-text {
  font-size: 16px;
  font-weight: 300;
  margin-top: 20px;
  margin-left: 6px;
}

.login-text a {
  color: #5cb6f9; 
  text-decoration: none;
}

.login-text a:hover {
  text-decoration: underline;
}

  .auth-wrapper {
    display: flex;
    flex-direction: column;
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

  .input-div input:focus {
    outline: none;
    border-color:rgb(84, 96, 180);
  }

  input {
    border-bottom-style: solid;
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    border-width: 2px;
    border-color: black;
    padding: 5px;
    margin: 5px;
    width: 300px;
    background-color: sandbox;
    font-family: 'Poppins';
    cursor: text;
  }

  h1, label, p, a {
    font-family: 'Poppins';
  }

  #title{
    margin-bottom: 20px;
    color: #12229d;
  }

  .button {
      border-style: none;
      border-width: 1px;
      padding: 5px;
      margin-top: 20px;
      margin-left: 5px;
      width: 310px;
      background-color: #5cb6f9;
      font-family: 'Poppins';
      cursor: pointer;
    }

    .button:hover {
      background-color:rgb(126, 189, 238);
    }

    .link {
      text-decoration: none;
      color: black;
    }

    .link:hover {
      color: grey;
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

  em {
    font-family: 'Quicksand', sans-serif;
    font-size: 12px;
    height: 7px;         
    line-height: 7px;    
    color: red;           
    visibility: visible;   
    transition: opacity 0.3s ease;
    margin-left: 5px;
  }

  .or {
    align-self: center;
    margin-top: 10px;
  }
  `
})
export class RegistrationComponent {

  dots: boolean = true;

  private fb = inject(FormBuilder);

  private assignedId = 0;
  registerForm = this.fb.group({
    id: this.assignedId,
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, passwordValidator]],
    //role: ['']
  });

  private service = inject(RegistrationService);
  register() {
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value as Registration);
    this.registerForm.reset();
    this.registerForm.get('id')?.setValue(this.assignedId);
  }

  showPassword() {
    var x = document.getElementById("pass1") as HTMLInputElement;
    if (x!.type === "password") {
      x.type = "text";
      this.dots = false;
    } else {
      x.type = "password";
      this.dots = true;
    }
  }
}
