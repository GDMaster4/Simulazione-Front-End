import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { placesFiltersResolver } from './resolvers/places-filters.resolver';
import { PlacessResolver } from './resolvers/places.resolver';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/login",
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"home",
    component:HomeComponent,
    resolve:{
      filters:placesFiltersResolver,
      places:PlacessResolver
    },
    runGuardsAndResolvers:"paramsOrQueryParamsChange"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
