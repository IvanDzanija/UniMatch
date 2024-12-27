import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SavedUniCardComponent } from '../saved-uni-card/saved-uni-card.component';
import { SavedUniversity } from './saved-uni.output.model';
import { SavedUniversitiesService } from './saved-universities.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-saved-universities',
  standalone: true,
  imports: [CommonModule, SavedUniCardComponent, HeaderComponent],
  template: `
  <app-header></app-header>
    <div>
    <h2 class="header">
      Here's what you saved 
    </h2>
    <p class="subtext">These are the institutions that caught your eye in case you want to dive deeper into your options!</p>
  </div>
  <div class="saved-container">
    @for (savedUni of savedSignal(); track savedUni) {
    <div>
      <app-saved-uni-card [savedUni]="savedUni"></app-saved-uni-card>
    </div>
    }
  </div>
  `,
  styles: `
  * {
  font-family: 'Poppins', sans-serif;
  }

  .header {
  font-size: 2.5em; 
  color: #12229d; 
  font-weight: 600; 
  text-align: center;
  margin-top: 30px;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.subtext {
  font-size: 1.2em;
  color: #12229d; 
  text-align: center;
  margin-bottom: 30px;
  opacity: 0.8; 
}
  `
})
export class SavedUniversitiesComponent {

  service = inject(SavedUniversitiesService);

  //savedSignal = signal<SavedUniversity[]>([]); // get saved from db
  savedSignal = this.service.savedUniversities;

  ngOnInit() {
    console.log(this.savedSignal());
    // this.service.getSaved().subscribe((res) => {
    //   this.savedSignal.set([]);
    //   this.savedSignal.set(res);
    // });
  }
}
