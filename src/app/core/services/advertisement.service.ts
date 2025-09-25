import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AdvertisementResponse, AdvertisementRequest } from '../models/advertisement.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdvertisementService {
  api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<AdvertisementResponse[]> {
    return this.http.get<AdvertisementResponse[]>(`${this.api}/HomeOwner/Advertisements`);
  }

  getById(id: number) {
    return this.http.get<AdvertisementResponse>(`${this.api}/HomeOwner/Advertisements/${id}`);
  }

  getMyAdvertisements(): Observable<any[]> {
    const token = localStorage.getItem('auth_token');
    return this.http.get<any[]>(`${this.api}/HomeOwner/MyAdvertisements`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  create(request: AdvertisementRequest) {
    const token = localStorage.getItem('auth_token');
    const form = new FormData();
    request.photos.forEach((f) => form.append('Photos', f, f.name));
    form.append('Title', request.title);
    form.append('Description', request.description);
    form.append('Address', request.address);
    form.append('City', request.city);
    form.append('Country', request.country);
    form.append('NumberOfRooms', String(request.numberOfRooms));
    form.append('HomeArea', String(request.homeArea));
    form.append('Garden', String(request.garden));
    form.append('ParkingSpace', String(request.parkingSpace));
    form.append('SwimmingPool', String(request.swimmingPool));

    return this.http.post(`${this.api}/HomeOwner/CreateAdvertisement`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  delete(id: number) {
    const token = localStorage.getItem('auth_token');
    return this.http.delete(`${this.api}/HomeOwner/DeleteAdvertisement/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  update(id: number, body: any) {
    const token = localStorage.getItem('auth_token');
    return this.http.put(`${this.api}/HomeOwner/UpdateAdvertisement/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  search(criteria: any) {
    return this.http.post<AdvertisementResponse[]>(`${this.api}/HomeOwner/Search`, criteria);
  }
}
