import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SearchService } from '../../../core/services/search.service';
import { Destination } from '../../../core/models/destination.model';

@Component({
  selector: 'app-destination-carousel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destination-carousel.component.html',
  styleUrl: './destination-carousel.component.css'
})
export class DestinationCarouselComponent implements OnInit {
  destinations = signal<Destination[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private searchService: SearchService, private router: Router) {}

  openDestination(id: number): void {
    this.router.navigate(['/destinations', id]);
  }

  ngOnInit(): void {
    this.searchService.getTrendingDestinations().subscribe({
      next: (data) => {
      this.destinations.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Destinations could not be loaded. Please check the API server.');
      }
    });
  }

}
