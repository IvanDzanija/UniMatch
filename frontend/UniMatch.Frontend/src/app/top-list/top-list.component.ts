import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { UniversityCardComponent } from "../university-card/university-card.component";
import { University } from './toplist-output.model';
import { Router } from '@angular/router';
import { DataService } from '../form/data.service';

@Component({
  selector: 'app-top-list',
  standalone: true,
  imports: [CommonModule, UniversityCardComponent],
  template: `
  <div>
    <h2 class="header">
      Top Picks for Your International Journey
    </h2>
    <p class="subtext">We've found the top universities that match your aspirations and dreams. Explore your future now!</p>
  </div>
  <div class="university-container">
    @for (university of topList(); track university) {
      <div>
      <app-university-card [university]="university"></app-university-card>
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

.university-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: space-around;
  margin: 60px;
}

.university-container > div {
  flex: 1 1 calc(50% - 20px); 
  box-sizing: border-box; 
}
  `
})
export class TopListComponent {
  constructor(private dataService:DataService){}
  router = inject(Router);
  universities: University[] = [];
  topList = signal<University[]>([]);
  ngOnInit() {
    /*const navigation = this.router.getCurrentNavigation();
    console.log("navigation= ", navigation)
    console.log(navigation?.extras?.state?.['unis'])
    this.universities = navigation?.extras?.state?.['unis'];
    console.log(this.universities)*/
    this.universities = this.dataService.getUniversities();
    console.log("Universities: ", this.universities)
    this.topList.set(this.universities)
    console.log("Initial topList: ", this.topList());
  }
 // topList = signal<University[]>(this.universities);
  
}