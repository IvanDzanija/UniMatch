import { Component, inject, OnInit } from '@angular/core';
import { User } from '../registration/registration.output.model';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterModule],
    standalone:true,
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss', 'header.component.css']
})
export class HeaderComponent implements OnInit{
  
  user: User | null = null;
  authService = inject(AuthService);
  
  ngOnInit(): void {
    this.authService.getUser().subscribe({
     next: (user) => {this.user=user}
    })
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
