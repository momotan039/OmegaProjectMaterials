import { Staff } from './../models/Staff';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpStaffService {


  constructor(private http:HttpClient) { }

  GetAll(){
    return  this.http.get<any>(MyTools.UrlRootApi+"/Staffs/GetAll");
  }
  AddOne(s:FormData){
    return this.http.post(MyTools.UrlRootApi+"/Staffs/Add",s,{
      responseType:"text",
      withCredentials:false
     });
  }

  EditOne(s:FormData){
    return this.http.put(MyTools.UrlRootApi+"/Staffs/EditOne",s,{
      responseType:"text",
      withCredentials:false
     });
  }


  DeleteOne(id:number){
    return this.http.delete(MyTools.UrlRootApi+"/Staffs/Delete/"+id,{
      responseType:"text"
     });
  }
}
