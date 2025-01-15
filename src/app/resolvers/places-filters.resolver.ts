import { ResolveFn } from '@angular/router';
import { PlacesFilters } from '../services/places.service';

export const placesFiltersResolver: ResolveFn<PlacesFilters> = (route) => {
  return route.queryParams as PlacesFilters;
};