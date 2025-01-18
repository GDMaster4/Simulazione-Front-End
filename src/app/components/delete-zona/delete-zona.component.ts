import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ZoneService } from '../../services/zone.service';

@Component({
  selector: 'app-delete-zona',
  templateUrl: './delete-zona.component.html',
  styleUrl: './delete-zona.component.css'
})
export class DeleteZonaComponent
{
  @Input()
  id:string | null=null;

  closeResult = '';

  constructor(protected modalService: NgbModal, protected zoneSrv:ZoneService) { }

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
  
  deletePlace()
  {
    this.zoneSrv.remove(this.id!);
    this.modalService.dismissAll();
  }
}