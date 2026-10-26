import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../../core/services/search.service';
import { SearchStateService } from '../../../core/services/search-state.service';
import { SearchMode, SearchQuery } from '../../../core/models/search-query.model';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {
  // ---- reactive state ----
  mode = signal<SearchMode>('flights');
  from = signal('Chennai (MAA)');
  to = signal('');
  departDate = signal(this.defaultDate(14));
  returnDate = signal(this.defaultDate(21));
  travelers = signal(1);
  searching = signal(false);
  apiError = signal('');
  errors = signal<{ to: boolean; depart: boolean }>({ to: false, depart: false });

  // ---- derived state ----
  routeCode = computed(() => {
    const from = this.codeFor(this.from());
    const to = this.to() ? this.codeFor(this.to()) : '???';
    return `${from} → ${to}`;
  });

  travelerLabel = computed(() => `${this.travelers()} adult${this.travelers() > 1 ? 's' : ''}`);

  submitLabel = computed(() => {
    if (this.searching()) return 'Searching…';
    const labels: Record<SearchMode, string> = {
      flights: 'Search flights',
      stays: 'Search stays',
      packages: 'Search packages'
    };
    return labels[this.mode()];
  });

  constructor(private searchService: SearchService, private state: SearchStateService, private router: Router) {}

  setMode(mode: SearchMode): void {
    this.mode.set(mode);
  }

  swapCities(): void {
    const currentFrom = this.from();
    const currentTo = this.to();
    this.from.set(currentTo);
    this.to.set(currentFrom);
  }

  incTravelers(): void {
    this.travelers.update((v) => Math.min(v + 1, 9));
  }

  decTravelers(): void {
    this.travelers.update((v) => Math.max(v - 1, 1));
  }

  onSearch(): void {
    const toMissing = !this.to().trim();
    const departMissing = !this.departDate();
    this.errors.set({ to: toMissing, depart: departMissing });
    if (toMissing || departMissing) return;

    const query: SearchQuery = {
      mode: this.mode(),
      from: this.from(),
      to: this.to(),
      departDate: this.departDate(),
      returnDate: this.returnDate(),
      travelers: this.travelers()
    };

    this.apiError.set('');
    this.searching.set(true);
    this.searchService.search(query).subscribe({
      next: (response) => {
        this.searching.set(false);
        this.state.set(response);
        this.router.navigate(['/results']);
      },
      error: (error) => {
        this.searching.set(false);
        this.apiError.set(error?.error?.message || 'We could not complete the search. Please check the API server and try again.');
      }
    });
  }

  private codeFor(cityStr: string): string {
    const match = cityStr.match(/\(([^)]+)\)/);
    if (match) return match[1];
    return cityStr.trim().slice(0, 3).toUpperCase() || '???';
  }

  private defaultDate(daysFromNow: number): string {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    return d.toISOString().split('T')[0];
  }
}
