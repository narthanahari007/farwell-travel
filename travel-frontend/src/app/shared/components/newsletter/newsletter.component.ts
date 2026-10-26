import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  email = signal('');
  subscribed = signal(false);
  submitting = signal(false);
  error = signal('');

  constructor(private searchService: SearchService) {}

  onSubmit(): void {
    this.error.set('');
    const email = this.email().trim();
    if (!email) {
      this.error.set('Please enter your email address.');
      return;
    }
    this.submitting.set(true);
    this.searchService.subscribeNewsletter(email).subscribe({
      next: () => {
        this.submitting.set(false);
        this.showSuccess();
      },
      error: (error) => {
        this.submitting.set(false);
        this.error.set(error?.error?.message || 'We could not subscribe you right now. Please try again.');
      }
    });
  }

  private showSuccess(): void {
    this.subscribed.set(true);
    this.email.set('');
    setTimeout(() => this.subscribed.set(false), 2200);
  }
}
