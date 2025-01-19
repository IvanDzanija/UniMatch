import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { UniversityCardComponent } from "../university-card/university-card.component";
import { University } from './toplist-output.model';
import { Router } from '@angular/router';
import { DataService } from '../form/data.service';
import { HeaderComponent } from "../header/header.component";
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
    selector: 'app-top-list',
    imports: [CommonModule, UniversityCardComponent, HeaderComponent, GoogleMapsModule],
    standalone:true,
    template: `
  <app-header></app-header>
  <div>
    <h2 class="header">
      Top Picks for Your International Journey
    </h2>
    <p class="subtext">We've found the top universities that match your aspirations and dreams. Explore your future now!</p>
  </div>
  <div class= "map-container">
  <google-map height="30vw" width="80vw" [options]="options">
    @for (location of markers; track location) {
      <map-advanced-marker #markerElem="mapAdvancedMarker" [position] = "{lat: location.lat, lng: location.lng}" (mapClick)="zoomClick({lat: location.lat, lng: location.lng})">
      </map-advanced-marker>
    }

  </google-map>
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
.map-container {
  display:flex;
  justify-content:center;
  margin:20px 0px;
}
  `
})
export class TopListComponent {
zoomClick(position: google.maps.LatLngLiteral): void {
  this.options = {
    ...this.options,
    center: position,  
    zoom: 10           // mapa se zoomira s 2.3 na 10
  };

}

mapCenter: google.maps.LatLngLiteral = {lat:10, lng:0};
mapZoom: number = 2.3;

options: google.maps.MapOptions = {
  center: this.mapCenter,
  zoom: this.mapZoom,
  mapId: "DEMO_MAP_ID"
};
  constructor(private dataService: DataService) { }
  router = inject(Router);
  markers: google.maps.LatLngLiteral[] = [];
  universities: University[] = [              // NE BRISATI!!!
    /* {
      name: "Harvard University",
       country: "Cambridge, Massachusetts",
      rank: 1,
       acc: 90,
      estimatedCost: 50000,
      major: "Computer Science",
       choiceNo: 1,
      website: "https://www.harvard.edu",
       lat:-1,                              //dodao sam koordinate u University tip podatka
       lng:15
     },
     {
       name: "Stanford University",
       country: "Stanford, California",
       rank: 2,
       acc: 90,
       estimatedCost: 50000,
       major: "Computer Science",
       choiceNo: 2,
       website: "https://www.stanford.edu",
       lat:60,
       lng:14
     },
     {
       name: "University of Cambridge",
       country: "Cambridge, Massachusetts",
       rank: 3,
       acc: 90,
       estimatedCost: 50000,
       major: "Computer Science",
       choiceNo: 3,
       website: "https://www.cam.ac.uk",
       lat:55,
       lng: 144
     },
     {
       name: "University of Oxford",           // NE BRISATI!!!
       country: "Oxford, England",
       rank: 4,
       acc: 90,
       estimatedCost: 50000,
      major: "Computer Science",
       choiceNo: 4,
       website: "https://www.ox.ac.uk",
      lat:55,
       lng: -100
     }
    */
  ];
  topList = signal<University[]>([]);
  //topList:University[] = [];
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
    for(var university of this.topList()) {                     
      this.markers.push({lat: university.lat, lng: university.lng});     //punimo marker s pozicijama sveučilišta
    }




  }
  // topList = signal<University[]>(this.universities);

}