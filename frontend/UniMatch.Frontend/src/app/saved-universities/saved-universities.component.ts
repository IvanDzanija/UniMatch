import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { SavedUniCardComponent } from '../saved-uni-card/saved-uni-card.component';
import { SavedUniversity } from './saved-uni.output.model';
import { SavedUniversitiesService } from './saved-universities.service';
import { HeaderComponent } from "../header/header.component";
import { UniversityInfoComponent } from '../university-info/university-info.component';
import { MatDialog } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../registration/registration.output.model';

@Component({
    selector: 'app-saved-universities',
    imports: [CommonModule, SavedUniCardComponent, HeaderComponent, GoogleMapsModule],
    standalone:true,
    template: `
  <app-header></app-header>
    <div>
    <h2 class="header">
      Here's what you saved 
    </h2>
    <p class="subtext">These are the institutions that caught your eye in case you want to dive deeper into your options!</p>
  </div>
  <div class= "map-container">
  <!--
  <google-map height="30vw" width="80vw" [options]="options">
    @for (location of markers; track location) {
      <map-advanced-marker #markerElem="mapAdvancedMarker" [position] = "{lat: location.lat, lng: location.lng}" (mapClick)="zoomClick({lat: location.lat, lng: location.lng})">
      </map-advanced-marker>
    }

  </google-map>
-->
  <google-map height="30vw" width="80vw" [options] ="options" >
    <ng-container *ngFor="let location of markers$ |async; trackby: trackByLatLng">
    <map-advanced-marker #markerElem="mapAdvancedMarker" [position] = "{lat: location.lat, lng: location.lng}" (mapClick)="zoomClick({lat: location.lat, lng: location.lng})">
    </map-advanced-marker>
    </ng-container>
  </google-map>
  </div>
    
  <div class="saved-container">
    <div class="icons">
    <i class="fa-solid fa-building-columns"></i>
    <i class="fa-solid fa-location-dot"></i> 
    <i class="fa-solid fa-ranking-star"></i>
    <i class="fa-solid fa-percent"></i>
    <i class="fa-solid fa-euro-sign"></i>
    </div>
    
   
    <ng-container *ngIf="savedUniversities$ | async as savedUniversities">
      <div *ngFor="let savedUni of savedUniversities; trackBy: trackBySavedUni">
        <app-saved-uni-card [savedUni]="savedUni"></app-saved-uni-card>
      </div>
    </ng-container>
    <!--
    @for (savedUni of savedSignal(); track savedUni) {
    <div>
      <app-saved-uni-card [savedUni]="savedUni"></app-saved-uni-card>
    </div>
    }
  </div>
   -->
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

.icons {
  display: grid;
  grid-template-columns: 25% 12% 12% 9% 29%;

  > i {
    justify-self: center;
  }
  
}
.map-container {
  display:flex;
  justify-content:center;
  margin:20px 0px;
}
  `
})
export class SavedUniversitiesComponent {

  savedUniversities$: Observable<SavedUniversity[] | null> = new Observable();
  markers$: Observable<google.maps.LatLngLiteral[] | null> = new Observable();

  user$: Observable<User | null>;
  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
   }

  //savedSignal = signal<SavedUniversity[]>([]); // get saved from db
  //savedSignal = this.service.savedUniversities;
  
  
  zoomClick(position: google.maps.LatLngLiteral): void {
    this.options = {
      ...this.options,
      center: position,  
      zoom: 10           // mapa se zoomira s 2.3 na 10
    };
  
  }

  //updateMarkers() : void {
  //  this.markers= [];
  //  for(var university of this.savedSignal()) {                     
  //    this.markers.push({lat: university.lat, lng: university.lng});     //punimo marker s pozicijama sveučilišta
  //  }
  //}
  
  mapCenter: google.maps.LatLngLiteral = {lat:10, lng:0};
  mapZoom: number = 2.3;
  markers: google.maps.LatLngLiteral[] = [];
  
  options: google.maps.MapOptions = {
    center: this.mapCenter,
    zoom: this.mapZoom,
    mapId: "DEMO_MAP_ID"
  };
  trackBySavedUni(index: number, savedUni: SavedUniversity): number {
    return savedUni.rank; 
  }

  trackByLatLng(index: number, location: google.maps.LatLngLiteral): string {
    return `${location.lat},${location.lng}`; 
  }
/*
  ngOnInit() {
    this.savedUniversities$= this.authService.user$.pipe(
      map(user => user?.savedUniversities || [])
    );
    this.markers$ = this.authService.user$.pipe(
      map(user => user?.savedUniversities.map(university => ({lat: university.lat, lng: university.lng})) || [])
    );
    
    
    
    //this.service.getSaved();
    //console.log(this.savedSignal());
    
    
    //for(var university of this.savedSignal()) {                     
    //  this.markers.push({lat: university.lat, lng: university.lng});     //punimo marker s pozicijama sveučilišta
    //}
    // this.service.getSaved().subscribe((res) => {
    //   this.savedSignal.set([]);
    //   this.savedSignal.set(res);
    // });
    
  }*/
}
