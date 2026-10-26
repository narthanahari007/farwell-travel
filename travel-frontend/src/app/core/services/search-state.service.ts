
import { Injectable, signal } from '@angular/core';
import { SearchResponse } from '../models/search-response.model';

@Injectable({ providedIn: 'root' })
export class SearchStateService {
  private readonly storageKey = 'farwell_last_search';
  response = signal<SearchResponse | null>(this.restore());

  set(response: SearchResponse): void {
    this.response.set(response);
    sessionStorage.setItem(this.storageKey, JSON.stringify(response));
  }

  clear(): void {
    this.response.set(null);
    sessionStorage.removeItem(this.storageKey);
  }

  private restore(): SearchResponse | null {
    try {
      const raw = sessionStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) as SearchResponse : null;
    } catch {
      return null;
    }
  }
}
