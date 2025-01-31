import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SearchHistoryCardComponent } from "../search-history-card/search-history-card.component";
import { CommonModule } from '@angular/common';
import { SearchHistoryItem } from './search-history-item.output.model';
import { SearchHistoryServiceService } from './search-history-service.service';

@Component({
  selector: 'app-search-history',
  imports: [HeaderComponent, SearchHistoryCardComponent, CommonModule],
  template: `
  <app-header></app-header>
  <div>
    <h2 class="header">
    Your Saved Forms and Results, Always Within Reach 
    </h2>
    <p class="subtext">Access your filled forms and their outcomes whenever you need them.</p>
  </div>
  <div class="big-container">
    @for(item of searchItems2; track item) {
      <div>
      <app-search-history-card [item]="item"></app-search-history-card>
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

.big-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
  `
})
export class SearchHistoryComponent {
  //searchItems: SearchHistoryItem[] = [];
 
  searchItems2: SearchHistoryItem[] = [];    //zamijenite searchItems s ovime u template-u kad odradite zahtjev
  constructor(private service: SearchHistoryServiceService) {

  }

  ngOnInit() {
    this.service.getItems().subscribe({
      next: (items: SearchHistoryItem[]) => {
        this.searchItems2= items;               //pri refreshu se dohvaća povijest sa backenda
      }, error: (err) => {
        console.error("Error happened while gathering search history", err);
      }
      }
    );
  }

  
}
