import { inject, Injectable, signal } from '@angular/core';
import { SavedUniversity } from './saved-uni.output.model';
import { HttpClient } from '@angular/common/http';
import { University } from '../top-list/toplist-output.model';

@Injectable({
  providedIn: 'root'
})
export class SavedUniversitiesService {

  constructor() { }
  saved = []
  /*saved = [
    {
      name: 'University of Tokyo',
      country: 'Japan',
      city: 'Tokyo',
      rank: 24,
      acc: 89.5,
      estimatedCost: 7500
    },
    {
      name: 'Caltech',
      country: 'United States',
      city: 'Pasadena, California',
      rank: 6,
      acc: 90.4,
      estimatedCost: 12000
    },
    {
      name: 'ETH Zurich',
      country: 'Switzerland',
      city: 'Zurich',
      rank: 7,
      acc: 88.9,
      estimatedCost: 10000
    }
  ];
*/
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
    return this.http.post<boolean>('/api/add/', x);    // TO DO
  }

  getSaved() {
    return this.http.get<SavedUniversity[]>('/api/getSavedUniversities');
  }
}
