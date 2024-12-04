import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferFiltersComponent } from './offer-filters.component';

describe('OfferFiltersComponent', () => {
  let component: OfferFiltersComponent;
  let fixture: ComponentFixture<OfferFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
