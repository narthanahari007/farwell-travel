
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchResponse, SearchResult } from '../../core/models/search-response.model';
import { SearchStateService } from '../../core/services/search-state.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  response = signal<SearchResponse | null>(null);
  loading = signal(true);

  constructor(private state: SearchStateService) {}

  ngOnInit(): void {
    this.response.set(this.state.response());
    this.loading.set(false);
  }

  isPackage(result: SearchResult): boolean {
    return result.type === 'package';
  }

  isOffer(result: SearchResult): boolean {
    return result.type !== 'package';
  }
}
