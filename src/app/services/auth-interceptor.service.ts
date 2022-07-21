import { MyLocalStorage } from './MyLocalStorage';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  //make any request header contain current token
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =MyLocalStorage.GetToken();
    if(token){
      const cloned=req.clone({
        headers:req.headers.set("Authorization",token)
      })
      return next.handle(cloned)
    }
    else
    return next.handle(req)
  }
}
