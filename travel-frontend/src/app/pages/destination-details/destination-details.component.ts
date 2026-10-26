
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Destination } from '../../core/models/destination.model';
import { TravelService } from '../../core/services/travel.service';

@Component({
  selector: 'app-destination-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './destination-details.component.html',
  styleUrl: './details-pages.css'
})
export class DestinationDetailsComponent implements OnInit {
  item = signal<Destination | null>(null);
  error = signal('');
  constructor(private route: ActivatedRoute, private travel: TravelService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.travel.getDestination(id).subscribe({
      next: item => this.item.set(item),
      error: () => this.error.set('Destination could not be loaded.')
    });
  }
}
