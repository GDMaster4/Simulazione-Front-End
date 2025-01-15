import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { ZoneService } from '../../services/zone.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-add-zona',
  templateUrl: './add-zona.component.html',
  styleUrl: './add-zona.component.css'
})
export class AddZonaComponent implements OnInit,OnDestroy
{
  zoneForm=this.fb.group({
    cap: ['', Validators.required]
  });
  private destroyed$= new Subject<void>();  
	closeResult = '';

  constructor(protected modalService: NgbModal, protected fb: FormBuilder,
    protected zoneSrv:ZoneService, protected placeSrv:PlacesService) { }

  ngOnInit()
  {
    this.zoneForm.valueChanges
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
  
  addZone()
  {
    if(this.zoneForm.valid)
    {
      const {cap}=this.zoneForm.value;
      const zoneId=this.zoneSrv.add(cap!);
      this.placeSrv.add(zoneId,cap!);
      this.modalService.dismissAll();
      this.zoneForm.reset();
    }
  }
}