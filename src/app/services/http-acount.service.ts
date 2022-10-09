import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
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

   ResetPassword(user:UserAuth,token:string){
    
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token);

    return this.httpClient.post(MyTools.UrlRootApi+"/Account/ResetPassword",user,{
      headers:headers,
      responseType:"text"
    });
   }

   ForgetPassword(mail:string){
    let user=new UserAuth()
    user.email=mail
    return this.httpClient.post(MyTools.UrlRootApi+"/Account/ForgetPassword",user,{
      responseType:"text"
     });
   }

   EditImageProfile(id:number,image:FormData,isGroup=false){
    if(!isGroup)
    return this.httpClient.put(MyTools.UrlRootApi+"/Account/EditImageProfile/",image,{
      responseType:"text",
    });
    else
    return this.httpClient.put(MyTools.UrlRootApi+"/Account/EditImageProfileGroup/",image,{
      responseType:"text",
    });
   }
}
