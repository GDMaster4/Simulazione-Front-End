import { ResolveFn } from '@angular/router';
import { OfferFilters } from '../services/offer.service';


export const offerFiltersResolver: ResolveFn<OfferFilters> = (route) => {
  return route.queryParams as OfferFilters;
};
