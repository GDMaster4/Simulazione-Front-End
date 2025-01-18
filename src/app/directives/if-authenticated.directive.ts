import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit,OnDestroy
{
  private hasContent=false;
  private destroyed$ = new Subject<void>();

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected authSrv: AuthService
  ) { }

  ngOnInit()
  {
    this.authSrv.currentUser$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => {
        this.updateView();
      });
  }

  ngOnDestroy()
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private updateView()
  {
    if (this.authSrv.isLoggedIn()) {
      if(this.hasContent==false){
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}