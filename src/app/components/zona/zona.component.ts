import { Component, Input } from '@angular/core';
import { Zone } from '../../entities/zone.entity';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrl: './zona.component.css'
})
export class ZonaComponent
{
  @Input()
  zona:Zone | null=null;
}