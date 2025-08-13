import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private http= inject(HttpClient);
  fullname = signal<string | null>(null);
  
  login(form: Object) {
    return this.http
      .post<{ token: string; fullname: string }>(`${this.apiUrl}/login`, form)
      .pipe(
        tap(({ token, fullname }) => this._setAuthentication(token, fullname))
      );
  }
  logout() {
    localStorage.removeItem('token');
  }

  private _setAuthentication(token: string, fullname: string) {
    this.fullname.set(fullname);
    localStorage.setItem('token', token);
  }
  
  checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http
      .get<{
        fullname: string;
      }>(`${this.apiUrl}/auth`, { headers })
      .pipe(
        tap(({ fullname }) => {
          this.fullname.set(fullname);
          return true;
        }),map(() => true),
        catchError(() => {
          this.logout();
          return of(false);
        })
      );
  }
}
