import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Zone } from '../entities/zone.entity';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { enviroment } from '../../../collegamento';
import { PlacesService } from './places.service';

@Injectable({
  providedIn: 'root'
})
export class ZoneService 
{
  private _zones$= new BehaviorSubject<Zone[]>([]);
  zones$=this._zones$.asObservable();

  constructor(protected http:HttpClient,protected authSrv:AuthService, protected router:Router,
    protected toastSrv:ToastrService
  )
  {
    this.authSrv.currentUser$
      .subscribe(user => {
        if (user) {
          this.fetch();
        }
        else {
          this._zones$.next([]);
        }
      })
  }

  fetch()
  {
    this.http.get<Zone[]>(`${enviroment.apiUrl}/zone`)
      .subscribe(zones=>{
        this._zones$.next(zones);
      });
  }

  caps()
  {
    return this.http.get<string[]>(`${enviroment.apiUrl}/zone/caps`);
  }

  add(cap:string)
  {
    const newCap={
      cap:cap
    }
    this.http.post<Zone>(`${enviroment.apiUrl}/zone/add`, newCap)
      .subscribe(addZone => {
        const tmp = structuredClone(this._zones$.value);
        tmp.push(addZone);
        this._zones$.next(tmp);
        this.fetch();
      },error => {
        this.toastSrv.error(error);
      }); 
  }
  
  remove(id:string)
  {    
    this.http.delete<Zone>(`${enviroment.apiUrl}/zone/${id}`)
      .subscribe(deleted => {
        const tmp = structuredClone(this._zones$.value);
        const index = this._zones$.value.findIndex(zone => zone.id === deleted.id);
        tmp.splice(index,1);
        console.log(tmp);
        this._zones$.next(tmp);
      }, error => {
        this.toastSrv.error(error);
      });
  }
}
