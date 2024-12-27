import { inject, Injectable } from '@angular/core';
import { Registration } from './registration.output.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }

  router = inject(Router);
  http = inject(HttpClient);

  register(data: Registration) {
    this.http.post<boolean>('/api/register', data).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['/login']);
        }
        else {
          alert('Već postoji račun s tom email adresom!');
        }
      }
    );
  }
}
