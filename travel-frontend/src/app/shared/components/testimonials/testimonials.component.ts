import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  name: string;
  trip: string;
  avatar: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [
    {
      quote: `Booked flights, a hotel in Ubud and an airport transfer in about six minutes. The total price on the search page was the total price I paid — genuinely rare.`,
      name: 'Ritika Menon',
      trip: 'Bali package, June 2026',
      avatar: 'https://i.pravatar.cc/88?img=32'
    },
    {
      quote: `My flight got rescheduled at midnight and a real person called me about it before I'd even seen the email. Rebooked the connecting train too.`,
      name: 'Arjun Iyer',
      trip: 'Kyoto trip, March 2026',
      avatar: 'https://i.pravatar.cc/88?img=51'
    },
    {
      quote: `Compared four sites for a Ladakh trip. This package was ₹6,000 cheaper for the exact same hotel and dates, no fine print.`,
      name: 'Sanya Kapoor',
      trip: 'Leh-Ladakh, August 2025',
      avatar: 'https://i.pravatar.cc/88?img=15'
    }
  ];

  activeIndex = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  goTo(i: number): void {
    this.activeIndex.set(i);
    this.restartAutoplay();
  }

  private startAutoplay(): void {
    this.timer = setInterval(() => {
      this.activeIndex.update((v) => (v + 1) % this.testimonials.length);
    }, 5500);
  }

  private restartAutoplay(): void {
    clearInterval(this.timer);
    this.startAutoplay();
  }
}
