import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest, UserInfoResponse } from '../../interfaces/auth/IAuth';
import { ApiResponse } from '../../interfaces/api/IAPI';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);

  private _isAuthenticated = signal(false);
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  private _userName = signal('');
  readonly userName = this._userName.asReadonly();

  private _role = signal<string | null>(null);
  readonly role = this._role.asReadonly();

  private httpOptions = { withCredentials: true };

  login(credentials: LoginRequest) {
    return this.http
    .post<ApiResponse<UserInfoResponse>>(`${this.apiUrl}/login`, credentials, this.httpOptions)
    .pipe(
      tap((res) => {
        if (res?.data) {
          this._isAuthenticated.set(true);
        }
      }),
      switchMap(() => this.checkAuth())
    );
  }

  logout() {
    return this.http
    .post<ApiResponse<null>>(`${this.apiUrl}/logout`, {}, this.httpOptions)
    .pipe(
      tap(() => {
        this._isAuthenticated.set(false);
        this._userName.set('');
      }),
      catchError(() => {
        this._isAuthenticated.set(false);
        this._userName.set('');
        return of(null);
      })
    );
  }

  checkAuth() {
    return this.http
    .get<ApiResponse<UserInfoResponse>>(`${this.apiUrl}/me`, this.httpOptions)
    .pipe(
      tap((res) => {
        const ok = !!res?.data;
        this._isAuthenticated.set(ok);
        if(ok) {
          const { name, surname, role } = res.data;
          this._userName.set(`${name} ${surname}`);
          this._role.set(role);
        }
      }),
      catchError(() => {
        this._isAuthenticated.set(false);
        this._userName.set('');
        this._role.set(null);
        return of(null);
      })
    );
  }
}
