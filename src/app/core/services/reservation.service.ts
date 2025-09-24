import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationRequest } from '../models/reservation.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private base = `${environment.apiUrl}/HomeOwner`;
  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return { Authorization: `Bearer ${token}` };
  }

  create(request: ReservationRequest) {
    return this.http.post(`${this.base}/Reservations`, request, {
      headers: this.getAuthHeaders(),
    });
  }
  getReservationsForOwner(adId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/ReservationsForOwner?adId=${adId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
