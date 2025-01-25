import { Component, input } from '@angular/core';
import { SearchHistoryItem } from '../search-history/search-history-item.output.model';

@Component({
  selector: 'app-search-history-card',
  imports: [],
  template: `
    @if(item(); as item) {
      <div class="search-history-card">
  <div class="search-criteria">
    <h3>Search Criteria</h3>
    <ul>
      <li><strong>Continent:</strong> {{item.inputInformation.continent}}</li>
      <li><strong>Rank:</strong> {{item.inputInformation.rankMin}} - {{item.inputInformation.rankMax}} (Priority: {{item.inputInformation.rankPrio}})</li>
      <li><strong>Safety Index:</strong> {{item.inputInformation.safetyMin}} - {{item.inputInformation.safetyMax}} (Priority: {{item.inputInformation.safetyPrio}})</li>
      <li><strong>Acceptance Rate:</strong> {{item.inputInformation.accMin}}% - {{item.inputInformation.accMax}}% (Priority: {{item.inputInformation.accPrio}})</li>
      <li><strong>International Student Ratio:</strong> {{item.inputInformation.ISRMin}}% - {{item.inputInformation.ISRMax}}% (Priority: {{item.inputInformation.ISRPrio}})</li>
      <!-- <li><strong>Cost of Living:</strong> {{item.inputInformation.CoLMin}} - {{item.inputInformation.CoLMax}} (Priority: {{item.inputInformation.CoLPrio}})</li> -->
      <li><strong>Rent:</strong> {{item.inputInformation.rentMin}}€ - {{item.inputInformation.rentMax}}€ (Priority: {{item.inputInformation.rentPrio}})</li>
      <li><strong>Grocery Costs:</strong> {{item.inputInformation.groceryMin}}€ - {{item.inputInformation.groceryMax}}€ (Priority: {{item.inputInformation.groceryPrio}})</li>
      <li><strong>Transport Costs:</strong> {{item.inputInformation.transportMin}}€ - {{item.inputInformation.transportMax}}€ (Priority: {{item.inputInformation.transportPrio}})</li>
      <li><strong>Recreation Costs:</strong> {{item.inputInformation.recreationMin}}€ - {{item.inputInformation.recreationMax}}€ (Priority: {{item.inputInformation.recreationPrio}})</li>
      <li><strong>Annual Healthcare Budget:</strong> {{item.inputInformation.healthcareBudgetMin}}€ - {{item.inputInformation.healthcareBudgetMax}}€ (Priority: {{item.inputInformation.healthcareBudgetPrio}})</li>
      <li><strong>Tuition Budget:</strong> {{item.inputInformation.tuitionBudgetMin}}€ - {{item.inputInformation.tuitionBudgetMax}}€ (Priority: {{item.inputInformation.tuitionBudgetPrio}})</li>
      <li><strong>Major:</strong> {{item.inputInformation.major}}</li>
    </ul>
  </div>

  <div class="results">
    <h3>Search Results</h3>
    <ul>
      @for(university of item.results; track university) {
        <li>
          <strong>{{university.name}}</strong>, {{university.country}}
          <ul>
            <li>#{{university.rank}} in rank</li>
            <li>Acceptance Rate: {{university.acc}}%</li>
            <li>Estimated Tuition: {{university.estimatedCost}}€</li>
            <li><a href="{{university.website}}" target="_blank">Website</a></li>
          </ul>
        </li>
    }  
    </ul>
  </div>
</div>
    }
  `,
  styles: `
  .search-history-card {
  display: flex;
  flex-direction: row;
  gap: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 100%; 
  flex-wrap: wrap;
  margin: 0 auto;
}

.search-criteria,
.results {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
}

.search-criteria h3,
.results h3 {
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}

.search-criteria ul,
.results ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.search-criteria ul li,
.results ul li {
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #555;
}

.results {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-grow: 1;
}

.results ul {
  column-count: 2; 
  column-gap: 20px; 
}

.results ul li ul {
  margin-top: 5px;
  padding-left: 15px;
  list-style: disc;
}

.results ul li ul li {
  margin-bottom: 5px;
  font-size: 0.85rem;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
  `
})
export class SearchHistoryCardComponent {
  item = input<SearchHistoryItem>();
}
