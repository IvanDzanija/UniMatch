import { Component, inject, Inject, input, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { University } from '../top-list/toplist-output.model';
import { UniversityInfoService } from './university-info.service';
import { UniversityInfo } from './university-info.input.model';

@Component({
  selector: 'app-university-info',
  standalone: true,
  imports: [],
  template: `
  @if (university(); as university) {
    <div class="university-dialog">
  <header class="dialog-header">
    <h1>{{university.name}}</h1>
    <button class="close-dialog" aria-label="Close" (click)="closeDialog()">&times;</button>
  </header>

  <div class="dialog-body">
    <section class="university-header">
      <p>{{university.country}} • {{university.region}}</p>
      <p class="ranking">#{{university.rank}} in Global University Ranking</p>
    </section>

    <section class="admission">
      <h2>Admissions</h2>
      <p>Acceptance Rate: <strong>{{university.acceptanceRate}} %</strong></p>
      <p>International Students: <strong>{{university.internationalStudentRatio}} %</strong> of the student population</p>
    </section>

    <section class="programs">
      <h2>Programs Offered</h2>
      <ul>
        @if (university.computerScience) {
        <li>Computer Science</li>
        } @if (university.business) {
        <li>Business</li>
        } @if (university.economics) {
        <li>Economics</li>
        } @if (university.psychology) {
        <li>Psychology</li>
        } @if (university.biology) {
        <li>Biology</li>
        } @if (university.law) {
        <li>Law</li>
        } @if (university.medicine) {
        <li>Medicine</li>
        } @if (university.mathematics) {
        <li>Mathematics</li>
        } @if (university.art) {
        <li>Art</li>
        } @if (university.physics) {
        <li>Physics</li>
        }
      </ul>
    </section>

    <section class="tuition">
      <h2>Tuition</h2>
      <p>Annual Fee: <strong>{{university.tuition}} EUR</strong></p>
    </section>

    <section class="cost-of-living">
      <h2>Cost of Living</h2>
      <ul>
        <li>Rent: {{university.rentCost}} EUR</li>
        <li>Groceries: {{university.groceryCost}} EUR</li>
        <li>Recreation: {{university.recreationCost}} EUR</li>
        <li>Healthcare: {{university.healthcareCost}} EUR</li>
        <li>Transportation: {{university.transportCost}} EUR</li>
      </ul>
      <p><strong>Overall Price:</strong> {{university.estimatedCost}} EUR</p>
    </section>

    <section class="safety">
      <h2>Safety Index</h2>
      @if (university.safetyIndex < 30) {
        <p>{{university.safetyIndex}} - Very Risky</p>
      } @if (university.safetyIndex >= 30 && university.safetyIndex < 49) {
        <p>{{university.safetyIndex}} - Risky</p>
      } @if (university.safetyIndex >= 50 && university.safetyIndex <= 69) {
        <p>{{university.safetyIndex}} - Moderately Safe</p>
      } @if (university.safetyIndex >= 70 && university.safetyIndex <= 89) {
        <p>{{university.safetyIndex}} - Safe</p>
      } @if (university.safetyIndex >= 90) {
        <p>{{university.safetyIndex}} - Very Safe</p>
      }
    </section>
  </div>

  <footer class="dialog-footer">
    <p>For more information, visit:</p>
    <a [href]="university.website" target="_blank">{{university.website}}</a>
  </footer>
</div>
  }
  `,
  styles: `
    body {
    font-family: 'Poppins', sans-serif;
    background-color: #f7f7f7;
    color: #12229d;
    margin: 0;
    padding: 0;
  }

  .university-dialog {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    padding: 20px;
    overflow-y: auto;
  }

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #5cb6f9;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .dialog-header h1 {
    font-size: 1.5rem;
    margin: 0;
    color: #12229d;
  }

  .close-dialog {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #5cb6f9;
    cursor: pointer;
  }

  .dialog-body section {
    margin-bottom: 20px;
  }

  .dialog-body h2 {
    font-size: 1.2rem;
    color: #5cb6f9;
    margin-bottom: 10px;
  }

  .dialog-body p,
  .dialog-body ul {
    margin: 0;
    color: #12229d;
  }

  .dialog-body ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  .dialog-body ul li {
    margin-bottom: 5px;
  }

  .dialog-footer {
    border-top: 2px solid #5cb6f9;
    padding-top: 10px;
    text-align: center;
  }

  .dialog-footer a {
    color: #5cb6f9;
    text-decoration: none;
  }

  .dialog-footer a:hover {
    text-decoration: underline;
  }
  `
})
export class UniversityInfoComponent {
  constructor(public dialogRef: MatDialogRef<UniversityInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: University | undefined) { }
  service = inject(UniversityInfoService);
  university = signal<UniversityInfo | undefined>(undefined);
  info: UniversityInfo = {
    name: 'University', country: 'Country', costOfLiving: 50000, rank: 1, acceptanceRate: 90, estimatedCost: 50000, region: 'Region', internationalStudentRatio: 90, tuition: 50000, safetyIndex: 22, rentCost: 50000, groceryCost: 50000, recreationCost: 50000, healthcareCost: 50000, transportCost: 50000, computerScience: true, business: false, economics: false, psychology: true, biology: false, law: false, medicine: false, mathematics: false, art: false, physics: false, website: 'https://www.harvard.edu'
  };
  //random = signal<UniversityInfo>(this.info);   // NE BRISATI KOMENTARE!!!

  ngOnInit() {
    console.log(this.data);
    //this.university.set(this.random());
    this.service.showInfo(this.data!.rank).subscribe((res) => { this.university.set(res) });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
