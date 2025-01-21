import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UniversityInfo } from './university-info.input.model';

@Injectable({
  providedIn: 'root'
})
export class UniversityInfoService {

  constructor() { }
  http = inject(HttpClient)

  showInfo(rank: number) {
    return this.http.get<UniversityInfo>(`http://localhost:8000/api/university/${rank}`);
  }
}
