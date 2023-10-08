import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Observable } from "rxjs-compat";
import { User } from "../models/auth.models";
import { ToastrService } from "ngx-toastr";
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Only for demo purpose
  authenticated = true;
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  user: User;

  constructor(private store: LocalStoreService,private _http: HttpClient,private _toastrService: ToastrService,private _router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public  currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  public get  currentUserValuee(): User {
    return this.currentUserSubject.value;
  }


  getuser() {
    return of({});
  }

  signin(email: any, password: any) {
    return this._http
    .post<any>(`${environment.apiUrl}/admin-login`, {email, password })
    .pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser',JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        console.log("asddas");
        this._router.navigateByUrl("/dashboard/v1");
        return user;
      })
    );
  }


  signout() {
    this.authenticated = false;
    return this._http
    .get<any>(`${environment.apiUrl}/logout`).subscribe(
      (re)=>{
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this._router.navigateByUrl("/sessions/signin");
      },
      (er:any)=>{
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this._router.navigateByUrl("/sessions/signin");
      }
    )
  }
}
