import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';
import { UserAuth } from '../models/UserAuth';

@Injectable({
  providedIn: 'root'
})
export class HttpAcountService {

  constructor(
    private httpClient:HttpClient
  ) {
   }

   ResetPassword(user:UserAuth){
    return this.httpClient.post(MyTools.UrlRootApi+"/Account/ResetPassword",user,{
     responseType:"text"
    });
   }

   ForgetPassword(mail:string){
    return this.httpClient.post(MyTools.UrlRootApi+"/Account/ForgetPassword",mail,{
      responseType:"text"
     });
   }
}
