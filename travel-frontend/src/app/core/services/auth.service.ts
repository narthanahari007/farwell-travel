
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, AuthUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly tokenKey = 'farwell_auth_token';
  user = signal<AuthUser | null>(this.restoreUser());

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, { name, email, password })
      .pipe(tap((response) => this.save(response)));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(tap((response) => this.save(response)));
  }

  logout(): void {
    const token = this.token();
    if (token) {
      this.http.post(`${this.baseUrl}/auth/logout`, {}, { headers: this.authHeaders() }).subscribe({
        complete: () => this.clearLocal(),
        error: () => this.clearLocal()
      });
    } else {
      this.clearLocal();
    }
  }

  token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  authHeaders(): HttpHeaders {
    const token = this.token();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  private save(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem('farwell_auth_user', JSON.stringify(response.user));
    this.user.set(response.user);
  }

  private clearLocal(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('farwell_auth_user');
    this.user.set(null);
  }

  private restoreUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem('farwell_auth_user');
      return raw ? JSON.parse(raw) as AuthUser : null;
    } catch {
      return null;
    }
  }
}
