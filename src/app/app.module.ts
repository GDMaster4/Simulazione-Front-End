import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';
import { DateAdapter, DateParserFormatter } from './utils/Datepicker-adapter';
import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { AuthInterceptor } from './utils/auth-interceptor';
import { ZoneService } from './services/zone.service';
import { PlacesService } from './services/places.service';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaceComponent } from './components/place/place.component';
import { DeletePlaceComponent } from './components/delete-place/delete-place.component';
import { DeleteAllComponent } from './components/delete-all/delete-all.component';
import { RouterModule } from '@angular/router';
import { ZonaComponent } from './components/zona/zona.component';
import { DeleteZonaComponent } from './components/delete-zona/delete-zona.component';
import { PlacesComponent } from './pages/places/places.component';
import { AddZonaComponent } from './components/add-zona/add-zona.component';
registerLocaleData(localeIt, 'it-IT');

@NgModule({
  declarations: [
    AppComponent,
    IfAuthenticatedDirective,
    LoginComponent,
    RegisterComponent,
    NavUserComponent,
    HomeComponent,
    PlaceComponent,
    DeletePlaceComponent,
    DeleteAllComponent,
    ZonaComponent,
    DeleteZonaComponent,
    PlacesComponent,
    AddZonaComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
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
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    ZoneService,
    PlacesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }