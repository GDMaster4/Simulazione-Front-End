import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Offer } from '../../entities/offer.entity';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrl: './offer-detail.component.css'
})
export class OfferDetailComponent implements OnInit,OnDestroy
{
  @Input()
  offer:Offer | null=null

  tmpOffer:Offer | null=null;
  offForm=this.fb.group({
    Titolo: ['', Validators.required],
    Descrizione:['', Validators.required],
    DataInserimento: ['', Validators.required],
    Azienda:['', Validators.required],
    Provincia:['', Validators.required],
    SmartWorking:[false, Validators.required],
    Retribuzione:[0,Validators.required],
    TipologiaContratto:['', Validators.required]
  });
  private destroyed$= new Subject<void>();  
	closeResult = '';

  constructor(protected modalService: NgbModal, protected fb: FormBuilder,
    protected offSrv:OfferService) { }

  ngOnInit()
  {
    this.offForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
  }
  
  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  open(content: TemplateRef<any>)
  {
    this.tmpOffer = {...this.offer!}; // Copia i valori originali di this.task in this.tmpTask
    this.offForm.setValue({
      Titolo: this.tmpOffer.Titolo,
      Descrizione:this.tmpOffer.DescrizioneBreve,
      DataInserimento: this.tmpOffer.DataInserimento,
      Azienda:this.tmpOffer.Azienda,
      Provincia:this.tmpOffer.Provincia,
      SmartWorking:this.tmpOffer.SmartWorking,
      Retribuzione:this.tmpOffer.RetribuzioneLorda,
      TipologiaContratto:this.tmpOffer.TipologiaContratto
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-Titolo' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

	private getDismissReason(reason: any): string
  {
		switch (reason)
    {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
  
  updateOffer()
  {
    if(this.offForm.valid)
    {
      const {Titolo,Descrizione,Azienda,Provincia, SmartWorking, Retribuzione, TipologiaContratto}=this.offForm.value;
      if(Retribuzione! >0)
      {
        this.offSrv.modify(this.offer!.id,Titolo!,Descrizione!,Azienda!,Provincia!,SmartWorking!,Retribuzione!,TipologiaContratto!);
        this.modalService.dismissAll();
        this.offForm.reset();
      }
    }
  }
}