import { Component, Input } from '@angular/core';
import { Place } from '../../entities/place.entity';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrl: './place.component.css'
})
export class PlaceComponent
{
  @Input()
  place:Place | null=null;
}