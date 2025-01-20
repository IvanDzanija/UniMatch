import { Injectable } from '@angular/core';
import { User } from './registration/registration.output.model';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user= new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient) {
    this.validateSession();
  }

  getUser(): Observable<User | null> {
    if(!this.user)console.log("no user found");
    else {
    } 
    return this.user.asObservable();
  }


  validateSession() : void {
    
    const authToken= localStorage.getItem('jwt');    //svaki put kad se dogodi login, stavi se jwt u lokalnu memoriju kao dokaz
    console.log('validateSession called. Token:', authToken);

    if(authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      this.http.get<User>("http://localhost:8000/user/validate-session", {headers}).subscribe({
          next: (user) => {
            console.log('validateSession success. User:', user);
            this.user.next(user); //ako je token u backend-u, user poprima vrijednost koja odgovara njegovom tokenu
          },
          error: (err) => {
            console.error('validateSession error:', err);
            this.user.next(null);  //ako token nije u backend-u, on se inicijalizira kao nula
          }

      });
    }
      else  {this.user.next(null);//ako token-a uopće nema, user se inicijalizira kao nula
        console.warn('No token found in localStorage. Setting user to null.');
      }
  }
  add(rank:number, authToken:string) : Observable<User|null>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.post<User>('https://localhost:8000/api/add/', {rank}, {headers}).pipe(
      tap( user => {
        this.user.next(user);
      }),
      catchError(error => {
        console.error('Saving the university failed', error);
        return throwError(() => new Error("Saving failed"));
      })
    );
  }
  remove(rank:number, authToken:string) : Observable<User|null> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.post<User>('https://localhost:8000/api/remove/', {rank}, {headers} ).pipe(
      tap( user => {
        this.user.next(user);
      }),
      catchError(error => {
        console.error('Removing the university failed', error);
        return throwError(() => new Error("Removing failed"));
      })
    );
  }

  setUser(user: User, jwtToken:string) {
    this.user.next(user);                 //vrijednost user varijable se mijenja i sve subscribeane komponente dobivaju novu vrijednost
    localStorage.setItem('jwt',jwtToken);    //postavlja jwt u lokalno spremište
  }

  clearUser() {
    this.user.next(null);                 //briše user vrijednost, sve subscribeane komponente dobivaju null vrijednost
    localStorage.removeItem('jwt');       //briše jwt iz lokalnog spremišta
  }
 login(username:string, password:string, rememberMe:boolean) : Observable<User|null> {
    return this.http.post<{user:User, jwt:string}>('http://localhost:8000/user/login/', {username, password, rememberMe}).pipe(
      tap( res => {
        console.log("res = ",res )
        this.setUser(res.user, res.jwt);        
      }),
      map(res => res.user),   //tap koristi jwt, observable koji se vraća jedino treba user iz post odgovora
      catchError(error => {
      console.error('Login failed', error);
      return throwError(() => new Error("login failed"));
    })
  );
  }
  logout() : Observable<boolean>{
    const authToken = localStorage.getItem('jwt');

    if(!authToken) {
      console.log("jwt nije prisutan u lokalnom spremištu");
      return of(false);                               //ako user nije uopće ispravno prijavljen preskače se post request i vraća false kao observable
    }
    else {
      this.clearUser();
      return of(true);
    }
  //  const headers = new HttpHeaders({
  //    'Authorization': `Bearer ${authToken}` // Add JWT token in the Authorization header
  //});
    //return this.http.post<boolean>('api/logout', headers).pipe( //post vraća true u slučaju ispravnog log outta
    //  tap(() => {
    //    this.clearUser();
    //  }),
    //  catchError(error => {
    //    console.error('Logout failed',error);
    //    return throwError(() => new Error("logout failed"));
    //  })

    //  );
  }

}


