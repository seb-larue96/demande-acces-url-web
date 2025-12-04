import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserRequest, UserResponse } from '../interfaces/IUsers';
import { ApiResponse } from '../../../core/interfaces/api/IAPI';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/users`;

  private readonly _users: WritableSignal<UserResponse[]> = signal([]);
  readonly users = this._users.asReadonly();

  private readonly _selectedUser: WritableSignal<UserResponse | null> = signal(null);
  readonly selectedUser = this._selectedUser.asReadonly();
  
  private readonly _loadingUsers = signal(false);
  readonly loadingUsers = this._loadingUsers.asReadonly();

  private httpOptions = {
    withCredentials: true
  };

  addUser(newUser: UserRequest) {
    return this.http
    .post<ApiResponse<UserResponse>>(`${this.apiUrl}/createUser`, newUser, this.httpOptions)
    .pipe(
      tap(newUser => this._users.update(currentUsers => [...currentUsers, newUser.data]))
    );
  }

  getUsers() {
    this._loadingUsers.set(true);

    return this.http
    .get<ApiResponse<UserResponse[]>>(`${this.apiUrl}/getUsers`, this.httpOptions)
    .pipe(
      tap(res => {
        this._users.set(res.data);
        this._loadingUsers.set(false);
      }),
      catchError(err => {
        this._loadingUsers.set(false);
        return throwError(() => err);
      })
    )
    .subscribe();
  }

  getUserById(id: number) {
    return this.http
    .get<ApiResponse<UserResponse>>(`${this.apiUrl}/getUserById/${id}`, this.httpOptions)
    .pipe(
      tap(res => this._selectedUser.set(res.data)),
      catchError(err => {
        return throwError(() => err)
      })
    )
    .subscribe();
  }
}
