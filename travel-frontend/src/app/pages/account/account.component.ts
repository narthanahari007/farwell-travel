
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TravelService } from '../../core/services/travel.service';
import { Booking } from '../../core/models/booking.model';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  bookings = signal<Booking[]>([]);
  error = signal('');
  loading = signal(true);

  constructor(public auth: AuthService, private travel: TravelService) {}

  ngOnInit(): void {
    if (!this.auth.user()) {
      this.loading.set(false);
      return;
    }
    this.travel.getMyBookings().subscribe({
      next: data => { this.bookings.set(data); this.loading.set(false); },
      error: error => {
        this.error.set(error?.error?.message || 'Bookings could not be loaded.');
        this.loading.set(false);
      }
    });
  }
}
