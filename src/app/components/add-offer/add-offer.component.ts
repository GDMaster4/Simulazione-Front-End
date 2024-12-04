import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OfferService } from '../../services/offer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrl: './add-offer.component.css'
})
export class AddOfferComponent implements OnInit,OnDestroy
{
  date:NgbDateStruct | null =null;
  offForm=this.fb.group({
    Titolo: ['', Validators.required],
    Descrizione:['', Validators.required],
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
  
  addOffer()
  {
    if(this.offForm.getRawValue().SmartWorking === undefined)
      this.offForm.patchValue({ SmartWorking: false});
    if(this.offForm.valid)
    {
      const {Titolo,Descrizione,Azienda,Provincia, SmartWorking, Retribuzione, TipologiaContratto}=this.offForm.value;
      if(Retribuzione! >0)
      {
        this.offSrv.add(Titolo!,Descrizione!,Azienda!,Provincia!,SmartWorking!,Retribuzione!,TipologiaContratto!);
        this.modalService.dismissAll();
        this.offForm.reset();
      }
    }
  }

  Today():NgbDateStruct
  {
    const today = new Date();
    today.setHours(0,0,0,0);
    return { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
  }
}