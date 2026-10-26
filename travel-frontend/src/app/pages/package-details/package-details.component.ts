
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TravelPackage } from '../../core/models/package.model';
import { TravelService } from '../../core/services/travel.service';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './package-details.component.html',
  styleUrl: './details-pages.css'
})
export class PackageDetailsComponent implements OnInit {
  item = signal<TravelPackage | null>(null);
  error = signal('');
  constructor(private route: ActivatedRoute, private travel: TravelService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.travel.getPackage(id).subscribe({
      next: item => this.item.set(item),
      error: () => this.error.set('Package could not be loaded.')
    });
  }
}
