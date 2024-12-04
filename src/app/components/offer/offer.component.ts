import { Component, Input } from '@angular/core';
import { Offer } from '../../entities/offer.entity';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent
{
  @Input()
  offer:Offer | null=null;

  constructor(protected offSrv:OfferService){}

  isSmartWorking(smart:boolean) {
    return smart ? "Da remoto" : "In sede";
  }
}