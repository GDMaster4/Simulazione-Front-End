import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { OfferFilters } from '../../services/offer.service';
import { assign } from 'lodash';
import { filter, Subject, takeUntil } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-offer-filters',
  templateUrl: './offer-filters.component.html',
  styleUrl: './offer-filters.component.css'
})
export class OfferFiltersComponent implements OnInit, OnDestroy
{
  filtersForm = this.fb.group({
    text: ['', {updateOn: 'change'} ],
    maxOfferte: [5, { updateOn: 'submit', validators: [Validators.min(1)] }]
  });

  @Input()
  set filters(value: OfferFilters | null)
  {
    const defaultValue = {
      text: '',
      maxOfferte:5
    }
    const tmp = assign(defaultValue, value);
    this.filtersForm.patchValue(tmp, {emitEvent: false});
    this.filtersForm.markAsPristine();
  }

  @Output()
  filterChange = new EventEmitter<OfferFilters>();

  protected destroyed$ = new Subject<void>();

  constructor(protected fb: FormBuilder){}

  ngOnInit(): void
  {
    this.filtersForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter(_ => this.filtersForm.valid)
      )
      .subscribe(value => {
        this.filterChange.emit({testo: value.text!, maxOfferte: value.maxOfferte!});
      });
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}