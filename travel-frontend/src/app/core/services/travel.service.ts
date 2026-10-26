
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TravelPackage } from '../models/package.model';
import { Destination } from '../models/destination.model';
import { Booking, BookingRequest } from '../models/booking.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TravelService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getPackage(id: number): Observable<TravelPackage> {
    return this.http.get<TravelPackage>(`${this.baseUrl}/packages/${id}`);
  }

  getDestination(id: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.baseUrl}/destinations/${id}`);
  }

  createBooking(request: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/bookings`, request, {
      headers: this.auth.authHeaders()
    });
  }

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings`, {
      headers: this.auth.authHeaders()
    });
  }
}
