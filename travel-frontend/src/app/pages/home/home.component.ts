
import { Component } from '@angular/core';
import { HeroSearchComponent } from '../../shared/components/hero-search/hero-search.component';
import { DestinationCarouselComponent } from '../../shared/components/destination-carousel/destination-carousel.component';
import { HowItWorksComponent } from '../../shared/components/how-it-works/how-it-works.component';
import { PackageGridComponent } from '../../shared/components/package-grid/package-grid.component';
import { TestimonialsComponent } from '../../shared/components/testimonials/testimonials.component';
import { NewsletterComponent } from '../../shared/components/newsletter/newsletter.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSearchComponent, DestinationCarouselComponent, HowItWorksComponent,
    PackageGridComponent, TestimonialsComponent, NewsletterComponent, FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
