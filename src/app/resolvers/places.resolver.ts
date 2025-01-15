import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Place } from '../entities/place.entity';
import { PlacesFilters, PlacesService } from '../services/places.service';

@Injectable({
  providedIn: 'root'
})
export class PlacessResolver implements Resolve<Place[]> 
{
  constructor(protected placeSrv: PlacesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Place[]>
  {
    const filters = route.queryParams as PlacesFilters;
    return this.placeSrv.listByZone(filters);
  }
}