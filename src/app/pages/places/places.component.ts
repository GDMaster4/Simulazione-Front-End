import { Component } from '@angular/core';
import { PlacesFilters, PlacesService } from '../../services/places.service';
import { debounceTime, map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { isNil, omitBy } from 'lodash';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrl: './places.component.css'
})
export class PlacesComponent
{
  protected updateQueryParams$ = new ReplaySubject<PlacesFilters>();

  protected destroyed$ = new Subject<void>();

  places$= this.placeSrv.places$;
  id:string="";

  constructor( protected router: Router, protected placeSrv:PlacesService,
    protected authSrv:AuthService,protected activatedRoute: ActivatedRoute)
  {
    authSrv.currentUser$
      .subscribe(user=>{
        if(!user) {
          router.navigate(['/login']);
        }
      })
  }
  
  ngOnInit(): void
  {
    this.places$.subscribe(places => {
      if (places && places.length > 0) {
        const firstPlaceZoneId = places[0].zone.id;
        this.id = firstPlaceZoneId;
      }
    });
    this.updateQueryParams$
    .pipe(
      takeUntil(this.destroyed$),
      map(filters => omitBy(filters, isNil)),
      map(filters => omitBy(filters, val => val === '')),
      debounceTime(150)
    )
    .subscribe(filters => {
      this.router.navigate([], {queryParams: filters});
    });
    this.activatedRoute.data.subscribe(data => console.log(data));    
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}