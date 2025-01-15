import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { assign } from 'lodash';
import { PlacesFilters } from '../../services/places.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-places-filters',
  templateUrl: './places-filters.component.html',
  styleUrl: './places-filters.component.css'
})
export class PlacesFiltersComponent implements OnInit,OnDestroy
{

  filtersForm = this.fb.group({
    zona: ['', {updateOn: 'change'} ]
  });
  zone$=this.zoneSrv.zones$;

  @Input()
  set filters(value: any | null)
  {
    const defaultValue = {
      zona: '',
    }
    const tmp = assign(defaultValue, value);
    this.filtersForm.patchValue(tmp, {emitEvent: false});
    this.filtersForm.markAsPristine();
  }

  @Output()
  filterChange = new EventEmitter<PlacesFilters>();

  protected destroyed$ = new Subject<void>();

  constructor(protected fb: FormBuilder, protected zoneSrv:ZoneService)
  {
    this.filtersForm.reset();
    this.filterChange.emit();
  }

  ngOnInit(): void
  {
    this.filtersForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter(_ => this.filtersForm.valid)
      )
      .subscribe(value => {
        this.filterChange.emit({
          zoneId: value.zona!
        });
      });
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}