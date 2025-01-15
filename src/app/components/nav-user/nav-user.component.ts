import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrl: './nav-user.component.css'
})
export class NavUserComponent
{
  @Input()
  user: User | null=null;

  @Output('logout')
  logoutEvent = new EventEmitter<void>();

  logout() {
    this.logoutEvent.emit();
  }
}