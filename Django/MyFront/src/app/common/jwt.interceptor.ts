import { Injectable } from "@angular/core";
import { AuthService } from "../Controller/auth/auth.service";
import { HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor {
  
  constructor(
    private _authService: AuthService
  ) { }

    intercept(req : HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this._authService.userSubject.value
        if (token) {
            req = req.clone({
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                })
            })
        }
        return next.handle(req)
        }
    }