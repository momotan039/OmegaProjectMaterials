import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpRegistrationService {

constructor(
  private httpClient:HttpClient
) { }

ConfirmRegistration(model:any){
  return this.httpClient.post(MyTools.UrlRootApi+"/Registration/ConfirmRegistration",model,{
    responseType:"text"
  });
}
}
