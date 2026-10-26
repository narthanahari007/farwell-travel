import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  num: string;
  title: string;
  copy: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent {
  steps: Step[] = [
    { num: '01 — Search', title: 'Tell us where and when', copy: 'One search compares flights, stays and full packages side by side — no separate tabs, no re-entering your dates five times.' },
    { num: '02 — Compare', title: 'See the real total, upfront', copy: 'Taxes and fees are shown before checkout, not sprung on you at the last screen. What you see is what you pay.' },
    { num: '03 — Go', title: 'Manage it all in one place', copy: 'Your bookings, boarding passes and cancellations live in one dashboard, with support that actually picks up.' }
  ];
}
