import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-delete-offer',
  templateUrl: './delete-offer.component.html',
  styleUrl: './delete-offer.component.css'
})
export class DeleteOfferComponent
{
  @Input()
  id:string | null=null;

	closeResult = '';

  constructor(protected modalService: NgbModal, protected offSrv:OfferService) { }

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
  
  deleteOffer()
  {
    this.offSrv.remove(this.id!);
    this.modalService.dismissAll();
  }
}