import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { offerFiltersResolver } from './resolvers/offer-filters.resolver';
import { OffersResolver } from './resolvers/offers.resolver';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/offers?maxOfferte=5",
    pathMatch:"full"
  },
  {
    path:"offers",
    component:HomeComponent,
    resolve:{
      filters:offerFiltersResolver,
      offers:OffersResolver
    },
    runGuardsAndResolvers:"paramsOrQueryParamsChange"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
