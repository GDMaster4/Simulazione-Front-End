import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Offer } from '../entities/offer.entity';
import { HttpClient } from '@angular/common/http';
import { isNil, omitBy } from 'lodash';

export interface OfferFilters
{
  maxOfferte:number;
  testo?:string;
}

@Injectable({
  providedIn: 'root'
})
export class OfferService
{
  protected _offers$= new BehaviorSubject<Offer[]>([]);
  offers$= this._offers$.asObservable();
  filtri:OfferFilters | null=null;

  constructor(protected http:HttpClient) {
    this.fetch();
  }

  updateOffers()
  {
    if(this.filtri!= null) {
      this.offers$= this.list(this.filtri)
    }
    else {
      this.fetch();
    }
  }

  fetch()
  {
    this.http.get<Offer[]>("/api/offers?maxOfferte=5")
      .subscribe(offers=>{
        this._offers$.next(offers);
      });
  }

  list(filters:OfferFilters)
  {
    this.filtri=filters;
    const q=omitBy(filters,isNil);
    const result =this.http.get<Offer[]>("/api/offers",{params: q});
    result.subscribe(offers=>{
      this._offers$.next(offers);
    });
    return result;
  }

  add(title:string,desc:string,date:string, azienda:string,prov:string, smart:boolean,retr:number,tipo:string )
  {
    const newOffer={
      Titolo:title,
      DescrizioneBreve: desc,
      DataInserimento: new Date(date),
      Azienda: azienda,
      Provincia:prov,
      SmartWorking:smart,
      RetribuzioneLorda:retr,
      TipologiaContratto:tipo
    };
    this.http.post<Offer>("/api/offers", newOffer)
      .subscribe(addOffer => {
        const tmp = structuredClone(this._offers$.value);
        const index = this._offers$.value.findIndex(offer => offer.id === addOffer.id);
        if(index!=-1){
          tmp.push(addOffer);
        }
        else{
          tmp[index] = addOffer;
        }
        this._offers$.next(tmp);
        this.updateOffers();
      },error => {
        console.error(error);
      });
  }
  
  modify(id:string,title:string,desc:string,date:string, azienda:string,prov:string, smart:boolean,retr:number,tipo:string )
  {
    const updateOffer={
      Titolo:title,
      DescrizioneBreve: desc,
      DataInserimento: new Date(date),
      Azienda: azienda,
      Provincia:prov,
      SmartWorking:smart,
      RetribuzioneLorda:retr,
      TipologiaContratto:tipo
    }
    console.log(updateOffer);
    this.http.patch<Offer>(`/api/offers/${id}/modify`,updateOffer)
      .subscribe(updated => {
        const index = this._offers$.value.findIndex(offer => offer.id === id);
        const tmp = structuredClone(this._offers$.value);
        tmp[index] = updated;
        this._offers$.next(tmp);
        this.updateOffers();
      },error => {
        console.error(error);
      });
  }

  remove(id:string)
  {
    this.http.delete<Offer>(`/api/offers/${id}/delete`)
      .subscribe(deleted => {
        const tmp = structuredClone(this._offers$.value);
        const index = this._offers$.value.findIndex(offer => offer.id === id);
        tmp.splice(index,1);
        console.log(tmp);
        this._offers$.next(tmp);
        this.updateOffers();
      }, error => {
        console.error(error); // Gestisci l'errore come desideri
      });
  }
}