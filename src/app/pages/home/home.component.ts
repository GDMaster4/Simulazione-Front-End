import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { OfferFilters, OfferService } from '../../services/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  ReplaySubject, Subject, debounceTime, map, takeUntil } from 'rxjs';
import { omitBy, isNil } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy
{
  protected updateQueryParams$ = new ReplaySubject<OfferFilters>();
  protected destroyed$ = new Subject<void>();
  offers$=this.offSrv.offers$;
  
  constructor(protected offSrv: OfferService, protected router: Router,
    protected activatedRoute: ActivatedRoute){}

  ngOnInit(): void
  {
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

  applyFilters(value:OfferFilters){
    this.updateQueryParams$.next(value);
  }
}