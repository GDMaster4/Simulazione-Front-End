import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../entities/offer.entity';
import { OfferFilters, OfferService } from '../services/offer.service';

@Injectable({
  providedIn: 'root'
})
export class OffersResolver implements Resolve<Offer[]> 
{
  constructor(protected offSrv: OfferService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Offer[]>
  {
    const filters = route.queryParams as OfferFilters;
    return this.offSrv.list(filters);
  }
}
