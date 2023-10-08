import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   *
   * @param {AuthService} _authenticationService
   */
  constructor(
    private _authenticationService: AuthService,
    private router: Router
  ) {}

  /**
   * Add auth header with jwt if user is logged in and request is to api url
   * @param request
   * @param next
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this._authenticationService.currentUserValuee;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        }),
      });
    }
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401 && err.status !== 500) {
              return;
            }
            this._authenticationService.signout();
            this.router.navigate(["/sessions/signin"]);
          }
        }
      )
    );
  }
}
