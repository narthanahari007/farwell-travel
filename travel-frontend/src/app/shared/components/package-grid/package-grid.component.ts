import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SearchService } from '../../../core/services/search.service';
import { TravelPackage } from '../../../core/models/package.model';

@Component({
  selector: 'app-package-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './package-grid.component.html',
  styleUrl: './package-grid.component.css'
})
export class PackageGridComponent implements OnInit {
  packages = signal<TravelPackage[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private searchService: SearchService, private router: Router) {}

  openPackage(id: number): void {
    this.router.navigate(['/packages', id]);
  }

  ngOnInit(): void {
    this.searchService.getPackages().subscribe({
      next: (data) => {
        this.packages.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Packages could not be loaded. Please check the API server.');
      }
    });
  }

}
