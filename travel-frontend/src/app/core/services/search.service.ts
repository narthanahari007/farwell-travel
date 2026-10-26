
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Destination } from '../models/destination.model';
import { TravelPackage } from '../models/package.model';
import { SearchQuery } from '../models/search-query.model';
import { SearchResponse } from '../models/search-response.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTrendingDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.baseUrl}/destinations/trending`);
  }

  getPackages(): Observable<TravelPackage[]> {
    return this.http.get<TravelPackage[]>(`${this.baseUrl}/packages`);
  }

  search(query: SearchQuery): Observable<SearchResponse> {
    return this.http.post<SearchResponse>(`${this.baseUrl}/search`, query);
  }

  subscribeNewsletter(email: string): Observable<{ message: string; email: string }> {
    return this.http.post<{ message: string; email: string }>(
      `${this.baseUrl}/newsletter/subscribe`, { email }
    );
  }
}
