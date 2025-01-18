import { Component, TemplateRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mod-passw',
  templateUrl: './mod-passw.component.html',
  styleUrl: './mod-passw.component.css'
})
export class ModPasswComponent
{
  passwForm = this.fb.group({
    nuovaPassw: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    Conferma: ['', Validators.required]
  });
  errPassw:string="";
  errConferma:string="";

	closeResult = '';
  constructor(protected modalService: NgbModal, protected fb: FormBuilder, protected authSrv:AuthService,
    protected router:Router){}

  redirect()
  {
    this.modalService.dismissAll();
  }

  open(content: TemplateRef<any>)
  {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
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
  
  controlloPassw()
  {
    const nuovaPassw = this.passwForm.getRawValue().nuovaPassw;
    const conferma = this.passwForm.getRawValue().Conferma;
    if(this.passwForm.get("nuovaPassw")?.errors)
    {
      this.errPassw="La password deve contenere almeno 8 caratteri, 1 "+
                      "maiuscola, 1 minuscola, 1 numero e 1 carattere speciale "+
                      "(#?!$%^&*-)";
    }
    else {
      this.errPassw="";
    }
  }

  controlloTesto()
  {
    const nuovaPassw = this.passwForm.getRawValue().nuovaPassw;
    const conferma = this.passwForm.getRawValue().Conferma;
    if(nuovaPassw != conferma) {
      this.errConferma="La password non è uguale";
    }
    else {
      this.errConferma="";
    }
  }

  nuovaPassw()
  {
    if(this.passwForm.valid)
    {
      const {nuovaPassw}= this.passwForm.value!;
      this.authSrv.modPassw(nuovaPassw!);
      this.passwForm.reset();
      this.modalService.dismissAll();
      this.router.navigate(['/home']);
    }
  }
}