
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TravelService } from '../../core/services/travel.service';
import { Booking } from '../../core/models/booking.model';
import { TravelPackage } from '../../core/models/package.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  packageId?: number;
  offerId?: number;
  mode: 'packages'|'flights'|'stays' = 'packages';
  title = 'Your trip';
  price = 'Price shown on search';
  travelDate = '';
  travelers = 1;
  item = signal<TravelPackage | null>(null);
  error = signal('');
  submitting = signal(false);

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private travel: TravelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const q = this.route.snapshot.queryParamMap;
    this.packageId = q.get('packageId') ? Number(q.get('packageId')) : undefined;
    this.offerId = q.get('offerId') ? Number(q.get('offerId')) : undefined;
    this.mode = (q.get('mode') as any) || 'packages';
    this.title = q.get('title') || 'Your trip';
    this.price = q.get('price') || 'Price shown on search';
    this.travelDate = new Date().toISOString().slice(0, 10);
    if (this.packageId) {
      this.travel.getPackage(this.packageId).subscribe({
        next: item => { this.item.set(item); this.title = item.name; this.price = item.price; },
        error: () => this.error.set('Could not load the package.')
      });
    }
  }

  submit(): void {
    if (!this.auth.user()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.error.set('');
    this.submitting.set(true);
    this.travel.createBooking({
      packageId: this.packageId,
      offerId: this.offerId,
      mode: this.mode,
      travelDate: this.travelDate,
      travelers: this.travelers
    }).subscribe({
      next: (booking: Booking) => {
        this.submitting.set(false);
        this.router.navigate(['/confirmation'], { state: { booking } });
      },
      error: (error) => {
        this.submitting.set(false);
        this.error.set(error?.error?.message || 'Booking could not be completed.');
      }
    });
  }
}
