export type SearchMode = 'flights' | 'stays' | 'packages';

export interface SearchQuery {
  mode: SearchMode;
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  travelers: number;
}
