
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './auth-pages.css'
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  error = signal('');
  submitting = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  submit(): void {
    this.error.set('');
    this.submitting.set(true);
    this.auth.register(this.name.trim(), this.email.trim(), this.password).subscribe({
      next: () => { this.submitting.set(false); this.router.navigate(['/']); },
      error: (error) => {
        this.submitting.set(false);
        this.error.set(error?.error?.message || 'Registration failed. Please check the details.');
      }
    });
  }
}
