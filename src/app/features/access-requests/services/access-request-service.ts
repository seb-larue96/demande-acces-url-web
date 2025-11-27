import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/interfaces/api/IAPI';
import { AccessRequestRequest, AccessRequestResponse } from '../interfaces/IAccessRequests';

@Injectable({
  providedIn: 'root'
})
export class AccessRequestService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/access-request`;

  private readonly _accessRequests: WritableSignal<AccessRequestResponse[]> = signal([]);
  readonly accessRequests = this._accessRequests.asReadonly();

  private readonly _selectedAccessRequest: WritableSignal<AccessRequestResponse | null> = signal(null);
  readonly selectedAccessRequest = this._selectedAccessRequest.asReadonly();
  
  private readonly _loadingAccessRequests = signal(false);
  readonly loadingAccessRequests = this._loadingAccessRequests.asReadonly();

  private httpOptions = {
    withCredentials: true
  };

  addAccessRequest(newAccessRequest: AccessRequestRequest) {
    return this.http
    .post<ApiResponse<AccessRequestResponse>>(`${this.apiUrl}/createAccessRequest`, newAccessRequest, this.httpOptions)
    .pipe(
      tap(newAccessRequest => this._accessRequests.update(currentAccessRequests => [...currentAccessRequests, newAccessRequest.data]))
    );
  }

  getAccessRequests() {
    return this.loadAccessRequests(`${this.apiUrl}/getAccessRequests`);
  }

  getAccessRequestsByUser() {
    return this.loadAccessRequests(`${this.apiUrl}/getAccessRequestsByUser`);
  }

  getAccessRequestById(id: number) {
    return this.http
    .get<ApiResponse<AccessRequestResponse>>(`${this.apiUrl}/getAccessRequestById/${id}`, this.httpOptions)
    .pipe(
      tap(accessRequest => { this._selectedAccessRequest.set(accessRequest.data);
      }),
      catchError(err => {
        return throwError(() => err);
      })
    )
    .subscribe();
  }

  private loadAccessRequests(url: string) {
    this._loadingAccessRequests.set(true);

    return this.http
    .get<ApiResponse<AccessRequestResponse[]>>(url, this.httpOptions)
    .pipe(
      tap(res => {
        this._accessRequests.set(res.data);
        this._loadingAccessRequests.set(false);
      }),
      catchError(err => {
        this._loadingAccessRequests.set(false);
        return throwError(() => err);
      })
    )
    .subscribe();
  }
}
