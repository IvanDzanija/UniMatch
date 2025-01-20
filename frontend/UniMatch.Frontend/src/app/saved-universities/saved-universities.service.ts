import { inject, Injectable, signal } from '@angular/core';
import { SavedUniversity } from './saved-uni.output.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { University } from '../top-list/toplist-output.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedUniversitiesService {

  constructor() { }
  //saved = []
  saved = [
    {
      name: 'University of Tokyo',
      website: 'https://www.u-tokyo.ac.jp/en/',
      country: 'Japan',
      city: 'Tokyo',
      rank: 24,
      acc: 89.5,
      estimatedCost: 7500,
      lat:50,
      lng:-10
    },
    {
      name: 'Caltech',
      website: 'https://www.caltech.edu/',
      country: 'United States',
      city: 'Pasadena, California',
      rank: 6,
      acc: 90.4,
      estimatedCost: 12000,
      lat:44,
      lng:-11.6
    },
    {
      name: 'ETH Zurich',
      website: 'https://www.ethz.ch/',
      country: 'Switzerland',
      city: 'Zurich',
      rank: 7,
      acc: 88.9,
      estimatedCost: 10000,
      lat:55.13,
      lng:-100
    }
  ];

  savedUniversities = signal<SavedUniversity[]>(this.saved);

  http = inject(HttpClient);

  remove(x: number) {
    this.savedUniversities.update((savedUniversities) => {
      return savedUniversities.filter((university) => university.rank != x)
    });
    console.log(this.savedUniversities());
  }

  removeFromDb(x: number) {
    return this.http.post<boolean>('/api/remove/', x);    // TO DO
  }

  add(x: University) {
    this.savedUniversities.update((savedUniversities) => { return [...savedUniversities, x] });
    console.log(this.savedUniversities());
  }

  addToDb(x: University) {
    return this.http.post<boolean>('http://localhost:8000/api/add/', x);    // TO DO
  }

  getSaved(): void {
    const authToken = localStorage.getItem('jwt');
    console.log("authToken: ", authToken);
  
    if (authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}` // Add JWT token in the Authorization header
      });
  
      this.http.get<SavedUniversity[]>('http://localhost:8000/api/getUniversitiesSaved/', { headers })
        .subscribe({
          next: (savedUniversities: SavedUniversity[]) => {
            // Update the signal with the fetched data
            console.log("Data fetched successfully: ", savedUniversities);
            this.savedUniversities.set(savedUniversities);
          },
          error: (error) => {
            console.error("Error fetching saved universities: ", error);
          }
        });
    } else {
      console.warn("No auth token found. Cannot fetch saved universities.");
    }
  }
  
}
