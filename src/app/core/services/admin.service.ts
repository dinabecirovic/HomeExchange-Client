import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return { Authorization: `Bearer ${token}` };
  }

  getPendingUsers() {
    return this.http.get<any[]>(`${this.api}/Administrator/pending-users`, {
      headers: this.getAuthHeaders(),
    });
  }

  approveUser(id: number) {
    return this.http.put(
      `${this.api}/Administrator/approve-user/${id}`,
      {},
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  getAllAds() {
    return this.http.get<any[]>(`${this.api}/Administrator/all-ads`, {
      headers: this.getAuthHeaders(),
    });
  }

  getPendingAds() {
    return this.http.get<any[]>(`${this.api}/Administrator/pending-ads`, {
      headers: this.getAuthHeaders(),
    });
  }

  approveAd(id: number) {
    return this.http.put(
      `${this.api}/Administrator/approve-ad/${id}`,
      {},
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  deleteAd(id: number) {
    return this.http.delete(`${this.api}/Administrator/advertisements/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateAvailability(adId: number, availability: string) {
    return this.http.put(
      `${this.api}/Administrator/advertisements/${adId}/availability`,
      { availability },
      { headers: this.getAuthHeaders() }
    );
  }
}
