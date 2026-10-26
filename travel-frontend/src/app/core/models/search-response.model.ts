
import { SearchQuery } from './search-query.model';

export interface SearchPackageResult {
  type: 'package';
  id: number;
  tag: string;
  name: string;
  img: string;
  days: string;
  people: string;
  price: string;
  per: string;
  description?: string;
}

export interface SearchOfferResult {
  type: 'flight' | 'stay';
  id: number;
  title: string;
  subtitle: string;
  provider: string;
  img: string;
  price: string;
  per: string;
  duration: string;
  rating: number;
  details: string[];
  destinationId?: number;
}

export type SearchResult = SearchPackageResult | SearchOfferResult;

export interface SearchResponse {
  query: SearchQuery;
  results: SearchResult[];
  result_count: number;
}
