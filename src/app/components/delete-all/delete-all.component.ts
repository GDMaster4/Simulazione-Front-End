import { Component, Input, TemplateRef } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-all',
  templateUrl: './delete-all.component.html',
  styleUrl: './delete-all.component.css'
})
export class DeleteAllComponent 
{
  @Input()
  id:string | null=null;

	closeResult = '';

  constructor(protected modalService: NgbModal, protected placeSrv:PlacesService) { }

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
  
  deleteAllPlaces()
  {
    this.placeSrv.removeAll(this.id!);
    this.modalService.dismissAll();
  }
}