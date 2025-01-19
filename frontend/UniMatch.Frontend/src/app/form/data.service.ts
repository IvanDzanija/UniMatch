import { Injectable } from '@angular/core';
import { University } from '../top-list/toplist-output.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private universities: University[] = [];

  setUniversities(data: University[]) {
    this.universities = data;
  }

  getUniversities(): University[] {
    return this.universities;
  }
}