import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MyTools } from 'src/app/constants/MyTools';
import { MyLocalStorage } from './MyLocalStorage';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, switchMap, observable, ObservableInput, empty, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router:Router,
    private authService:AuthService
  ) { }
  //make any request header contain current token
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =MyLocalStorage.GetToken();
    if(token){

      const cloned=req.clone({
        headers:req.headers.set("Authorization",token)
      })

      return next.handle(cloned)
      .pipe(
        catchError((error:HttpResponse<any>) => {

          //token expired or invalid
          if(error.status==0 || error.status==401)
          {
          MyTools.Dialog.closeAll()
          this.authService.LogOut()
          MyTools.ShowExpiredSessionMessage()
          }

          // else if(error.status==404)
          // {
          // MyTools.ShowFialdMessage(error,"Log In")
          // }

          // else if(error.status==400 || error.status==400)
          // MyTools.ShowFialdMessage(error,"")

          //send this error to function that sending this request
         return throwError(()=>error)
        })
      )
    }
    else
    return next.handle(req)
  }
}


