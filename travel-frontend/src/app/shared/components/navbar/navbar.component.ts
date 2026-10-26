
import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  shrink = signal(false);
  menuOpen = signal(false);

  constructor(public auth: AuthService, private router: Router) {}

  @HostListener('window:scroll')
  onScroll(): void { this.shrink.set(window.scrollY > 40); }

  toggleMenu(): void { this.menuOpen.update(v => !v); }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
