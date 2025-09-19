import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReservationRequest } from '../models/reservation.model';
import { environment } from '../../../environments/environment';

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
}
