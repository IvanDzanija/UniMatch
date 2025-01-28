import { Injectable } from '@angular/core';
import { SearchHistoryItem } from './search-history-item.output.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchHistoryServiceService {

  getItems(): Observable<SearchHistoryItem[]> {
    const authToken = localStorage.getItem('jwt');     
    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);   //stavlja token u header da backend zna tko traži zahtjev
      return this.http.get<SearchHistoryItem[]>("http://localhost:8000/search-history", { headers }).pipe(
        //traži se ISKLJUČIVO array, ako želite dodati status ili nešto drugo treba se dodati to u zahtjevu i mapirati odgovor na taj array
        tap({
          next: (response: any) => {
            console.log("Getting search history entries", response);
          },
          error: (err: any) => {
            console.error("An error has occurred while getting search history entries", err);
          }
        })
      );
    } else {
      return of([]);    //ako user nije logiran vraća se prazan array
    }
  }

  constructor(private http:HttpClient) { }
}
