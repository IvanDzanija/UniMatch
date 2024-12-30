import { Component, inject, input } from '@angular/core';
import { University } from '../top-list/toplist-output.model';
import { SavedUniversitiesService } from '../saved-universities/saved-universities.service';

@Component({
  selector: 'app-university-card',
  standalone: true,
  imports: [],
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

  addToFav(x: University) {
    console.log(x);
    if (this.favoriteUnis().includes(x)) {
      this.added = false;
      this.service.remove(x.rank);
      this.service.removeFromDb(x.rank).subscribe((res) => { console.log("Uspješno obrisano:", res) });
    } else {
      this.added = true;
      this.service.add(x);
      this.service.addToDb(x).subscribe((res) => { console.log("Uspješno dodano:", res) });
    }

    console.log(this.favoriteUnis());
  }
}
