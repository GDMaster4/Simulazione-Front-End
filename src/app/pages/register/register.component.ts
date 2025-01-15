import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../entities/user.entity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit,OnDestroy
{
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    Conferma: ['', Validators.required]
  })

  registerError = ''
  errConferma:string="";
  protected destroyed$ = new Subject<void>();

  constructor( protected fb : FormBuilder, protected authSrv: AuthService, protected router: Router,
    protected toastSrv:ToastrService ) {}

  ngOnInit(): void
  {
    this.registerForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.registerError = '';
      });
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  async register()
  {
    if(this.registerForm.valid)
    {
      const user: User = {
        firstName: this.registerForm.get("firstName")!.value || '',
        lastName: this.registerForm.get("lastName")!.value || '',
        email: this.registerForm.get("email")?.value || '',
        password: this.registerForm.get("password")?.value || ''
      };

      await this.authSrv.register(user);
      this.registerForm.reset();
      await this.toastSrv.info("UTENTE REGISTRATO");
      this.router.navigate(['/home']);
    }
    else {
      this.toastSrv.error("NON TUTTI I CAMPI SONO STATI INSERITI");
    }
  }

  controlloTesto()
  {
    const nuovaPassw = this.registerForm.getRawValue().password;
    const conferma = this.registerForm.getRawValue().Conferma;
    if(nuovaPassw != conferma) {
      this.errConferma="La password non è uguale";
    }
    else {
      this.errConferma="";
    }
  }
}
