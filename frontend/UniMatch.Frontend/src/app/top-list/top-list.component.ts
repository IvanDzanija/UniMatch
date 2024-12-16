import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { UniversityCardComponent } from "../university-card/university-card.component";
import { University } from './toplist-output.model';
import { Router } from '@angular/router';

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

  router = inject(Router);
  //universities: University[] = [];
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    //this.universities = navigation?.extras?.state?.['unis'];
  }

  universities: University[] = [
    {
      name: 'Harvard University',
      country: 'United States',
      city: 'Cambridge, Massachusetts',
      rank: 1,
      acc: 95.7,
      estimatedCost: 10000,
      major: 'Computer Science',
      website: 'https://www.harvard.edu',
      choiceNo: 1
    },
    {
      name: 'Stanford University',
      country: 'United States',
      city: 'Stanford, California',
      rank: 2,
      acc: 93.3,
      estimatedCost: 10000,
      major: 'Computer Science',
      website: 'https://www.stanford.edu',
      choiceNo: 2
    },
    {
      name: 'University of Cambridge',
      country: 'United Kingdom',
      city: 'Cambridge',
      rank: 3,
      acc: 92.8,
      estimatedCost: 15000,
      major: 'Engineering',
      website: 'https://www.cam.ac.uk',
      choiceNo: 3
    },
    {
      name: 'University of Oxford',
      country: 'United Kingdom',
      city: 'Oxford',
      rank: 4,
      acc: 91.5,
      estimatedCost: 14000,
      major: 'Philosophy',
      website: 'https://www.ox.ac.uk',
      choiceNo: 4
    },
    {
      name: 'MIT',
      country: 'United States',
      city: 'Cambridge, Massachusetts',
      rank: 5,
      acc: 94.2,
      estimatedCost: 11000,
      major: 'Mathematics',
      website: 'https://www.mit.edu',
      choiceNo: 5
    },
    {
      name: 'Caltech',
      country: 'United States',
      city: 'Pasadena, California',
      rank: 6,
      acc: 90.4,
      estimatedCost: 12000,
      major: 'Physics',
      website: 'https://www.caltech.edu',
      choiceNo: 6
    },
    {
      name: 'ETH Zurich',
      country: 'Switzerland',
      city: 'Zurich',
      rank: 7,
      acc: 88.9,
      estimatedCost: 10000,
      major: 'Mechanical Engineering',
      website: 'https://ethz.ch/en.html',
      choiceNo: 7
    },
    {
      name: 'University of Tokyo',
      country: 'Japan',
      city: 'Tokyo',
      rank: 8,
      acc: 87.3,
      estimatedCost: 8000,
      major: 'Artificial Intelligence',
      website: 'https://www.u-tokyo.ac.jp',
      choiceNo: 8
    },
    {
      name: 'University of Melbourne',
      country: 'Australia',
      city: 'Melbourne',
      rank: 9,
      acc: 85.6,
      estimatedCost: 9000,
      major: 'Biotechnology',
      website: 'https://www.unimelb.edu.au',
      choiceNo: 9
    },
    {
      name: 'NUS',
      country: 'Singapore',
      city: 'Singapore',
      rank: 10,
      acc: 86.7,
      estimatedCost: 9500,
      major: 'Data Science',
      website: 'https://www.nus.edu.sg',
      choiceNo: 10
    }
  ];

  topList = signal<University[]>(this.universities);

}
