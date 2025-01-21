import { Component, inject, OnInit } from '@angular/core';
import { User } from '../registration/registration.output.model';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterModule],
    standalone:true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', 'header.component.css']
})
export class HeaderComponent implements OnInit{
  
  user: User | null = null;
  user$: Observable<User | null>;
  constructor(private authService: AuthService) {
    this.user$= this.authService.user$;
  }
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      console.log('HeaderComponent received user update:', user);
    });
    //this.authService.getUser().subscribe({
    // next: (user) => {this.user=user}
    //});
    //if(this.user) {
    //  console.log("this username: ", this.user.username);
      //console.log("this mail", this.user.email);

    //}
    //else console.log("no user");
    //this.user = {
      //id: 2222,
      //username: "helpy",
      //email: "email",
      //password: "pass"
    //}
    //localStorage.setItem('jwt', "jwt222");
    
    
  }
  
  
  logout() {
    console.log("logging out...");
    this.authService.logout().subscribe({
      next: (success) => {
        if(success) console.log("successful logout");
        else console.warn("failed to log out");
      },
      error: (err) => { console.warn("failed to log out");

      }
    })
  }
  toggleSignOutMenu() {
    throw new Error('Method not implemented.');
  }

}
