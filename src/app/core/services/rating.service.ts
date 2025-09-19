import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RatingRequest } from '../models/rating.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RatingService {
  private base = `${environment.apiUrl}/HomeOwner`;
  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return { Authorization: `Bearer ${token}` };
  }

  create(request: RatingRequest) {
    return this.http.post(`${this.base}/Ratings`, request, {
      headers: this.getAuthHeaders(),
    });
  }
}
