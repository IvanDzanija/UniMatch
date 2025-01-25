import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SearchHistoryCardComponent } from "../search-history-card/search-history-card.component";
import { CommonModule } from '@angular/common';
import { SearchHistoryItem } from './search-history-item.output.model';

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
    @for(item of searchItems; track item) {
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
  searchItems: SearchHistoryItem[] = [
    {
      id: 1,
      inputInformation: {
        continent: "North America",
        rankMin: 1,
        rankMax: 50,
        rankPrio: 5,

        safetyMin: "70",
        safetyMax: "100",
        safetyPrio: 3,

        accMin: 5,
        accMax: 20,
        accPrio: 4,

        ISRMin: 10,
        ISRMax: 50,
        ISRPrio: 2,

        CoLMin: 500,
        CoLMax: 1500,
        CoLPrio: 4,

        rentMin: 300,
        rentMax: 800,
        rentPrio: 3,

        groceryMin: 100,
        groceryMax: 300,
        groceryPrio: 2,

        transportMin: 50,
        transportMax: 150,
        transportPrio: 1,

        recreationMin: 100,
        recreationMax: 300,
        recreationPrio: 2,

        healthcareBudgetMin: 200,
        healthcareBudgetMax: 600,
        healthcareBudgetPrio: 3,

        tuitionBudgetMin: 10000,
        tuitionBudgetMax: 40000,
        tuitionBudgetPrio: 5,

        major: "Computer Science",
      },
      results: Array.from({ length: 10 }, (_, index) => ({
        name: `University ${index + 1}`,
        country: "USA",
        rank: index + 1,
        acc: Math.floor(Math.random() * 15) + 5,
        estimatedCost: 50000 + index * 2000,
        major: "Computer Science",
        website: `https://university${index + 1}.edu`,
        choiceNo: index + 1,
        lat: 42.0 + index * 0.1,
        lng: -71.0 - index * 0.1,
        id: 100 + index + 1,
      }))
    },
    {
      id: 2,
      inputInformation: {
        continent: "Europe",
        rankMin: 51,
        rankMax: 150,
        rankPrio: 4,

        safetyMin: "80",
        safetyMax: "100",
        safetyPrio: 2,

        accMin: 10,
        accMax: 30,
        accPrio: 3,

        ISRMin: 15,
        ISRMax: 45,
        ISRPrio: 3,

        CoLMin: 700,
        CoLMax: 2000,
        CoLPrio: 3,

        rentMin: 400,
        rentMax: 1000,
        rentPrio: 2,

        groceryMin: 120,
        groceryMax: 400,
        groceryPrio: 2,

        transportMin: 80,
        transportMax: 200,
        transportPrio: 1,

        recreationMin: 150,
        recreationMax: 350,
        recreationPrio: 2,

        healthcareBudgetMin: 250,
        healthcareBudgetMax: 700,
        healthcareBudgetPrio: 4,

        tuitionBudgetMin: 5000,
        tuitionBudgetMax: 20000,
        tuitionBudgetPrio: 4,

        major: "Engineering",
      },
      results: Array.from({ length: 10 }, (_, index) => ({
        name: `University ${index + 11}`,
        country: "Germany",
        rank: 51 + index,
        acc: Math.floor(Math.random() * 20) + 10,
        estimatedCost: 20000 + index * 1500,
        major: "Engineering",
        website: `https://university${index + 11}.edu`,
        choiceNo: index + 1,
        lat: 48.0 + index * 0.1,
        lng: 11.0 - index * 0.1,
        id: 200 + index + 1,
      }))
    },
    {
      id: 2,
      inputInformation: {
        continent: "Europe",
        rankMin: 51,
        rankMax: 150,
        rankPrio: 4,

        safetyMin: "80",
        safetyMax: "100",
        safetyPrio: 2,

        accMin: 10,
        accMax: 30,
        accPrio: 3,

        ISRMin: 15,
        ISRMax: 45,
        ISRPrio: 3,

        CoLMin: 700,
        CoLMax: 2000,
        CoLPrio: 3,

        rentMin: 400,
        rentMax: 1000,
        rentPrio: 2,

        groceryMin: 120,
        groceryMax: 400,
        groceryPrio: 2,

        transportMin: 80,
        transportMax: 200,
        transportPrio: 1,

        recreationMin: 150,
        recreationMax: 350,
        recreationPrio: 2,

        healthcareBudgetMin: 250,
        healthcareBudgetMax: 700,
        healthcareBudgetPrio: 4,

        tuitionBudgetMin: 5000,
        tuitionBudgetMax: 20000,
        tuitionBudgetPrio: 4,

        major: "Engineering",
      },
      results: Array.from({ length: 10 }, (_, index) => ({
        name: `University ${index + 11}`,
        country: "Germany",
        rank: 51 + index,
        acc: Math.floor(Math.random() * 20) + 10,
        estimatedCost: 20000 + index * 1500,
        major: "Engineering",
        website: `https://university${index + 11}.edu`,
        choiceNo: index + 1,
        lat: 48.0 + index * 0.1,
        lng: 11.0 - index * 0.1,
        id: 200 + index + 1,
      }))
    }
  ];
}
