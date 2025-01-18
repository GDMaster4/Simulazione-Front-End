import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PlacesComponent } from './pages/places/places.component';
import { placesFiltersResolver } from './resolvers/places-filters.resolver';
import { PlacessResolver } from './resolvers/places.resolver';
import { ProfiloComponent } from './pages/profilo/profilo.component';

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
    path:"profilo",
    component:ProfiloComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"places",
    component:PlacesComponent,
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
