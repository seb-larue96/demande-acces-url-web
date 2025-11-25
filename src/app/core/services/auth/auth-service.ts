import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { loginRequest } from '../../interfaces/auth/IAuth';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);

  private _isAuthenticated = signal(false);
  readonly isAuthenticated: Signal<boolean> = computed(() => this._isAuthenticated());

  private _username = signal('');
  readonly username: Signal<string> = computed(() => this._username());

  httpOptions = {
    withCredentials: true
  };

  login(credentials: loginRequest) {
    return this.http.post(`${this.apiUrl}/login`, credentials, this.httpOptions).pipe(
      tap(() => this._isAuthenticated.set(true)),
      catchError(() => throwError(() => new Error('Login failed. Check your credentials.')))
    );
  }

  checkAuth() {
    return this.http.get(`${this.apiUrl}/me`, this.httpOptions).pipe(
      tap(() => this._isAuthenticated.set(true)),
      catchError(() => {
        this._isAuthenticated.set(false);
        return of(null);
      })
    );
  }
}
