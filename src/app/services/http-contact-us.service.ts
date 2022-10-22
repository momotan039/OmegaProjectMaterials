import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyTools } from '../constants/MyTools';
import { ContactUsMessage } from '../models/ContactUsMessage';

@Injectable({
  providedIn: 'root'
})
export class HttpContactUsService {

  constructor(private http:HttpClient) { }

  GetAll(){
  return  this.http.get<any>(MyTools.UrlRootApi+"/ContactUsMessages/GetAll");
}
AddOne(cum:ContactUsMessage){
  return this.http.post(MyTools.UrlRootApi+"/ContactUsMessages/Add",cum,{
    responseType:"text"
   });
}
}
