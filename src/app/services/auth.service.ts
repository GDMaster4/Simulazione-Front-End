import { Injectable } from '@angular/core';
import { User } from '../entities/user.entity';
import { BehaviorSubject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';
import { enviroment } from '../../../collegamento';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private _currentUser$= new BehaviorSubject<User | null>(null);
  currentUser$=this._currentUser$.asObservable();

  constructor(protected http:HttpClient, protected jwt:JwtService, protected router:Router, protected toatstSrv:ToastrService) {
    this.fetchUser();
  }

  isLoggedIn(){
    return this.jwt.hasToken();
  }
  
  /**
   *
   * @param userData User object
   */
  register(userData: User): void
  {
    this.http.post<User>(`${enviroment.apiUrl}/register`, userData)
      .subscribe(user=>{},
          error=> {
            // Handling error
            this.toatstSrv.error(error);
          }
      );
  }

  login(email:string,password:string)
  {
    return this.http.post<{user:any,token:string}>(`${enviroment.apiUrl}/login`,{email,password})
      .pipe(
        tap(res=>this.jwt.setToken(res.token)),
        map(res=>res.user)
      );
  }
  
  logout()
  {
    this.jwt.removeToken();
    this._currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  fetchUser()
  {
    this.http.get<User>(`${enviroment.apiUrl}/user/me`)
      .subscribe(user=>this._currentUser$.next(user));
  }
  
  fetchUsers()
  {
    return this.http.get<User[]>("api/user/users");
  }
}