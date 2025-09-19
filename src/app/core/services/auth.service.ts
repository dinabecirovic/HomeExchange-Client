import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/User`;
  private tokenKey = 'auth_token';

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(payload: RegisterRequest): Observable<any> {
    return this.http.post(`${this.api}/register`, payload);
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, payload).pipe(
      tap((res) => {
        if (res && res.token) {
          localStorage.setItem(this.tokenKey, res.token);

          const decoded = this.getDecodedToken();
          if (decoded) {
            const user: User = {
              id: Number(decoded.id),
              firstName: decoded.firstName,
              lastName: decoded.lastName,
              roles: decoded.role ?? decoded.roles ?? null,
              email: decoded.email ?? '',
            };
            this.userSubject.next(user);
          }
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;
    return decoded.role ?? decoded.roles ?? null;
  }

  getUserId(): number | null {
    const decoded = this.getDecodedToken();
    if (!decoded) return null;
    const id = decoded.id ?? null;
    return id ? Number(id) : null;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
