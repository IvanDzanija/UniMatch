import { Injectable } from '@angular/core';
import { inputInformation } from '../form-input.model';
import { HttpClient } from '@angular/common/http';
import { University } from '../top-list/toplist-output.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  result: University[] = [];
  // toPost(info: inputInformation) {

  //   return this.http.post<inputInformation>('http://localhost:3000/api/submit', { info }, {   //šaljemo json od info na api-server i logiramo response
  //     headers: { 'Content-Type': 'application/json' }
  //   }).subscribe(response => {
  //     console.log("Response from server:", response);
  //   });

  // }

  toPost(info: inputInformation) {

    return this.http.post<University[]>('http://localhost:3000/api/submit', { info }, {   //šaljemo json od info na api-server i logiramo response
      headers: { 'Content-Type': 'application/json' }
    });
  }

  readonly safetyLevels = [
    'low-safety',
    'medium-low-safety',
    'medium-safety',
    'medium-high-safety',
    'high-safety'
  ]



  validateSafety(safetyMin: string, safetyMax: string): boolean {
    if (!safetyMin || !safetyMax) return false;           //ionako je submit disable-an ako je ijedno polje prazno
    const minV = this.safetyLevels.indexOf(safetyMin);    //dajemo numericku vrijednost minSafety
    const maxV = this.safetyLevels.indexOf(safetyMax);    //dajemo numericku vrijednost maxSafety
    return minV > maxV;                                    //error ako je minSafety veći od maxSafety

  }




  constructor(private http: HttpClient) { }
}
