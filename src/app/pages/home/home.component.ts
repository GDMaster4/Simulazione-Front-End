import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesFilters, PlacesService } from '../../services/places.service';
import { debounceTime, map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { omitBy, isNil } from 'lodash';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy
{
  protected updateQueryParams$ = new ReplaySubject<PlacesFilters>();

  protected destroyed$ = new Subject<void>();
  zone$= this.zoneSrv.zones$;

  currentUser$= this.authSrv.currentUser$;

  constructor( protected router: Router, protected toastr: ToastrService, protected zoneSrv:ZoneService,
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
    // this.updateQueryParams$
    // .pipe(
    //   takeUntil(this.destroyed$),
    //   map(filters => omitBy(filters, isNil)),
    //   map(filters => omitBy(filters, val => val === '')),
    //   debounceTime(150)
    // )
    // .subscribe(filters => {
    //   this.router.navigate([], {queryParams: filters});
    // });
    this.activatedRoute.data.subscribe(data => console.log(data));    
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  applyFilters(value: PlacesFilters) {
    this.updateQueryParams$.next(value);
  }
}