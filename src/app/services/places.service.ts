import { Injectable } from '@angular/core';
import { Place } from '../entities/place.entity';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { enviroment } from '../../../collegamento';
import { ToastrService } from 'ngx-toastr';
import { ZoneService } from './zone.service';

export interface PlacesFilters
{
  zoneId:string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService
{
  private _places$= new BehaviorSubject<Place[]>([]);
  places$=this._places$.asObservable();

  constructor(protected http:HttpClient,protected zoneSrv:ZoneService, protected router:Router,
    protected toastSrv:ToastrService
  )
  {
    this.zoneSrv.zones$
      .subscribe(zones=>{
        if (zones) {
          zones.forEach(zone=>this.listByZone({zoneId:zone.id}));
        }
        else {
          this._places$.next([]);
        }
      })
  }

  listByZone(filters:PlacesFilters)
  {    
    const result=this.http.get<Place[]>(`${enviroment.apiUrl}/place/${filters.zoneId}`);
    result.subscribe(places=>{
        this._places$.next(places);
    });
    return this.places$;
  }

  add(zoneId:string,placeName:string, longitude:number,latitude:number)
  {
    const newPlace={
      zone:zoneId,
      placeName:placeName,
      longitude:longitude,
      latitude:latitude
    }
    this.http.post<Place>(`${enviroment.apiUrl}/place/add`, newPlace)
      .subscribe(addTodo => {
        const tmp = structuredClone(this._places$.value);
        tmp.push(addTodo);
        this._places$.next(tmp);
        // this.updateTodos();
      },error => {
        this.toastSrv.error(error);
      });
  }

  remove(id:string)
  {    
    this.http.delete<Place>(`${enviroment.apiUrl}/place/${id}`)
      .subscribe(deleted => {
        const tmp = structuredClone(this._places$.value);
        const index = this._places$.value.findIndex(place => place.id === deleted.id);
        tmp.splice(index,1);
        this._places$.next(tmp);
      }, error => {
        this.toastSrv.error(error);
      });
  }

  removeAll(id:string)
  {    
    this.http.delete<Place>(`${enviroment.apiUrl}/place/${id}/all`)
      .subscribe(deleted => {
        // const tmp = structuredClone(this._places$.value);
        // const index = this._places$.value.findIndex(place => place.id === deleted.id);
        // tmp.splice(index,1);
        // this._places$.next(tmp);
        this.listByZone({zoneId:id});
      }, error => {
        this.toastSrv.error(error);
      });
  }
}