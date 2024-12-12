import { Component, inject, input } from '@angular/core';
import { SavedUniversity } from '../saved-universities/saved-uni.output.model';
import { SavedUniversitiesService } from '../saved-universities/saved-universities.service';

@Component({
  selector: 'app-saved-uni-card',
  standalone: true,
  imports: [],
  template: `
  @if (savedUni(); as savedUni) {
    <div class="card-container">
      <div class="name">{{savedUni.name}}</div>
      <div class="some-class">{{savedUni.city}}, {{savedUni.country}}</div>
      <div class="some-class"><i>#{{savedUni.rank}}</i></div>
      <div class="info">
        <div>Acceptance rate: <i>{{savedUni.acc}}</i></div>
        <div>Estimated cost of 1 year: <i>{{savedUni.estimatedCost}} EUR</i></div>
      </div>
      <div class="some-class"><button class="trash-button" (click)="remove(savedUni.rank)"><i class="fa-solid fa-circle-minus"></i><span class="trash-text">Remove from favourites</span></button></div>
    </div>
  }
  `,
  styles: `
  .card-container {
    display: grid;
    grid-template-columns: 21% 25% 5% 40% 9%;
    border-bottom-style: solid;
    border-width: 1px;
    padding: 5px;
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 50px;
    margin-top: 50px;
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .name {
    font-weight: bold;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
}

.some-class {
  justify-self: center;
}

i {
    font-style: normal;
    font-weight: bold;
    color: black;
}

.trash-button {
    position: relative;
    cursor: pointer;
}

.trash-text {
    visibility : hidden;
    background-color: #555;
    color: #fff;
    font-size: 13px;
    text-align: center;
    border-radius: 5px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%; /* Position above the icon */
    left: 100%;
    margin-left: -50px;
    opacity: 0;
    transition: opacity 0.3s;
    max-width: fit-content;
    font-family: 'Poppins';
}

.trash-button:hover .trash-text {
  visibility: visible;
  opacity: 1;
}
  `
})
export class SavedUniCardComponent {
  savedUni = input<SavedUniversity>();

  service = inject(SavedUniversitiesService);

  remove(rank: number) {
    this.service.remove(rank);
    this.service.removeFromDb(rank).subscribe((res) => {
      if (res) {
        console.log("Uspješno obrisano!");
      } else {
        console.log("Neuspjelo brisanje!");
      }
    }
    )
  }
}
