import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-caps',
  templateUrl: './caps.component.html',
  styleUrl: './caps.component.css'
})
export class CapsComponent
{
  caps$=this.zoneSrv.caps();
  protected destroyed$ = new Subject<void>();

  constructor( protected router: Router, protected zoneSrv:ZoneService,
    protected authSrv:AuthService)
  {
    authSrv.currentUser$
      .subscribe(user=>{
        if(!user) {
          router.navigate(['/login']);
        }
      })
  }
}