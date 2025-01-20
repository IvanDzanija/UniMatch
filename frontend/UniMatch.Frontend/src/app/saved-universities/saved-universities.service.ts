import { inject, Injectable, signal } from '@angular/core';
import { SavedUniversity } from './saved-uni.output.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { University } from '../top-list/toplist-output.model';
import { Observable, tap } from 'rxjs';
import { User } from '../registration/registration.output.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class SavedUniversitiesService {

  //saved = []
  /*saved = [
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
  */

  savedUniversities = signal<SavedUniversity[]>([]); //ne koristi se

  http = inject(HttpClient);
  authService = inject(AuthService);

 /* remove(x: number) {
    this.savedUniversities.update((savedUniversities) => {
      return savedUniversities.filter((university) => university.rank != x)
    });
    console.log(this.savedUniversities());
  }
*/
  removeFromDb(x: SavedUniversity) {
    const jwt= localStorage.getItem('jwt');
    if(jwt)this.authService.remove(x, jwt).subscribe((res) => {
      if (res) {
        console.log("Uspješno obrisano!");
      } else {
        console.log("Neuspjelo brisanje!");
      }
    } );
  }
/*
  add(x: University) {
    this.savedUniversities.update((savedUniversities) => { return [...savedUniversities, x] });
    console.log(this.savedUniversities());
  }
*/
  addToDb(x: SavedUniversity) {
    const jwt= localStorage.getItem('jwt');
    if(jwt)this.authService.add(x, jwt).subscribe((res) => {
      if(res) {
        console.log("Uspješno dodano!");
      } else {
        console.log("Neuspjelo dodavanje");
      }
    });
  }

  getSaved() : any{     //ne koristi se
    const authToken = localStorage.getItem('jwt');
    if(authToken) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authToken}` // Add JWT token in the Authorization header
    });
    return this.http.get<SavedUniversity[]>('http://localhost:8000/api/getSavedUniversities', { headers }).pipe(
      tap((savedUniversities: SavedUniversity[]) => {
        // Update the signal with the fetched data
        this.savedUniversities.set(savedUniversities);
      })
    );
    }
    else return null;
    
  }
}
