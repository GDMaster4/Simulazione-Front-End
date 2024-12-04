import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { OfferComponent } from './components/offer/offer.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import localeIt from '@angular/common/locales/it';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { AddOfferComponent } from './components/add-offer/add-offer.component';
import { DateAdapter, DateParserFormatter } from './utils/Datepicker-adapter';
import { OfferDetailComponent } from './components/offer-detail/offer-detail.component';
import { OfferFiltersComponent } from './components/offer-filters/offer-filters.component';
import { DeleteOfferComponent } from './components/delete-offer/delete-offer.component';
registerLocaleData(localeIt, 'it-IT');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OfferComponent,
    AddOfferComponent,
    OfferDetailComponent,
    OfferFiltersComponent,
    DeleteOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: NgbDateAdapter,
      useClass: DateAdapter
    },
    {
      provide: NgbDateParserFormatter,
      useClass: DateParserFormatter
    },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
    // {provide: LOCALE_ID, useValue: 'it'},
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }