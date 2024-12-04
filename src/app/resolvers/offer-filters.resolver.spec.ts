import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { offerFiltersResolver } from './offer-filters.resolver';


describe('offerFiltersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => offerFiltersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
