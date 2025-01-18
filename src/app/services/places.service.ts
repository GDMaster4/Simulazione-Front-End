import { Injectable } from '@angular/core';
import { Place } from '../entities/place.entity';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  private filtri:PlacesFilters | null=null;

  constructor(protected http:HttpClient, protected zoneSrv:ZoneService,
    protected toastSrv:ToastrService)
  {
    this.zoneSrv.zones$
      .subscribe(zones=>{
        if (zones)
        {
          zones.forEach(zone=>{
            this.filtri = {
              zoneId:zone.id
            };
            this.listByZone({zoneId:zone.id})
          });
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

  remove(id:string)
  {    
    this.http.delete<Place>(`${enviroment.apiUrl}/place/${id}`)
      .subscribe(deleted => {
        const tmp = structuredClone(this._places$.value);
        const index = this._places$.value.findIndex(place => place.id === deleted.id);
        tmp.splice(index,1);
        this._places$.next(tmp);
        this.listByZone(this.filtri!)
      }, error => {
        this.toastSrv.error("Error in removing place");
      });
  }

  removeAll(id:string)
  {    
    this.http.delete<Place>(`${enviroment.apiUrl}/place/${id}/all`)
      .subscribe(deleted => {
        this._places$.next([]);
        this.listByZone({zoneId:id});
      }, error => {
        this.toastSrv.error("Error in removing all places");
      });
  }
}