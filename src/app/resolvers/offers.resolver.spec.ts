import { TestBed } from '@angular/core/testing';
import { OffersResolver } from './offers.resolver';


describe('ProductsResolver', () => {
  let resolver: OffersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OffersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});