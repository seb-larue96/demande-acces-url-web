import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/interfaces/api/IAPI';
import { AccessRequestResponse } from '../interfaces/IAccessRequests';

@Injectable({
  providedIn: 'root'
})
export class AccessRequestService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/access-request`;

  private readonly _accessRequests: WritableSignal<AccessRequestResponse[]> = signal([]);
  readonly accessRequests: Signal<AccessRequestResponse[]> = this._accessRequests.asReadonly();

  private readonly _selectedAccessRequest: WritableSignal<AccessRequestResponse | null> = signal(null);
  readonly selectedAccessRequest: Signal<AccessRequestResponse | null> = this._selectedAccessRequest.asReadonly();
  
  private readonly _loadingAccessRequests = signal(false);
  readonly loadingAccessRequests = this._loadingAccessRequests.asReadonly();

  httpOptions = {
    withCredentials: true
  };

  getAccessRequests() {
    this._loadingAccessRequests.set(true);
    return this.http
    .get<ApiResponse<AccessRequestResponse[]>>(`${this.apiUrl}/getAccessRequests`, this.httpOptions)
    .pipe(
      tap(accessRequests => {
        this._accessRequests.set(accessRequests.data);
        this._loadingAccessRequests.set(false);
      }),
    );
  }

  getAccessRequestsByUser() {
    this._loadingAccessRequests.set(true);
    return this.http
    .get<ApiResponse<AccessRequestResponse[]>>(`${this.apiUrl}/getAccessRequestsByUser`, this.httpOptions)
    .pipe(
      tap(accessRequests => {
        this._accessRequests.set(accessRequests.data);
        this._loadingAccessRequests.set(false);
      }),
    );
  }

  getAccessRequestById(id: number) {
    return this.http
    .get<ApiResponse<AccessRequestResponse>>(`${this.apiUrl}/getAccessRequestById/${id}`, this.httpOptions)
    .pipe(
      tap(accessRequest => this._selectedAccessRequest.set(accessRequest.data))
    );
  }
}
