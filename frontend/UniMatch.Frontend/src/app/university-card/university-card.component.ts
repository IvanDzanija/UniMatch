import { Component, inject, input } from '@angular/core';
import { University } from '../top-list/toplist-output.model';
import { SavedUniversitiesService } from '../saved-universities/saved-universities.service';
import { AuthService } from '../auth.service';
import { User } from '../registration/registration.output.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-university-card',
    imports: [CommonModule, RouterModule],
    standalone:true,
    templateUrl: './university-card.component.html',
    styleUrl: './university-card.component.scss'
})
export class UniversityCardComponent {
  university = input<University>();
  service = inject(SavedUniversitiesService);

  added = false;
  favoriteUnis = this.service.savedUniversities;
  hearts!: NodeListOf<HTMLElement>;

  constructor() {
    this.hearts = document.querySelectorAll<HTMLElement>('.fa-heart');
    

    // Add event listeners
    this.hearts.forEach((heart: HTMLElement) => {
      heart.addEventListener('click', () => {
        heart.classList.toggle('red');
      });
    });
  }
  user: User | null = null;
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getUser().subscribe({
     next: (user) => {this.user=user}
    })
  }

  addToFav(x: University) {
    console.log(x);
    if (this.favoriteUnis().includes(x)) {
      this.added = false;
      //this.service.remove(x.rank);
      //this.service.removeFromDb(x.rank).subscribe((res) => { console.log("Uspješno obrisano:", res) });
      this.service.removeFromDb(x.rank);
    } else {
      this.added = true;
      //this.service.add(x);
      //this.service.addToDb(x).subscribe((res) => { console.log("Uspješno dodano:", res) });
      this.service.addToDb(x.rank);
    }

    console.log(this.favoriteUnis());
  }
}
