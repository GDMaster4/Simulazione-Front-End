import { Component, Input } from '@angular/core';
import { Zone } from '../../entities/zone.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrl: './zona.component.css'
})
export class ZonaComponent
{
  @Input()
  zona:Zone | null=null;

  constructor(protected router:Router){}

  dettaglio()
  {
    this.router.navigate(['/places'], { queryParams: { zoneId: this.zona!.id } });
  }
}