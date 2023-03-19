import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpActivityService {


 
  constructor(private http:HttpClient) { }

  GetAll(){
    return  this.http.get<any>(MyTools.UrlRootApi+"/News/GetAll");
  }

  GetOne(id: string) {
    return  this.http.get<any>(MyTools.UrlRootApi+"/News/GetOne/"+id);
  }

  AddOne(s:FormData){
    return this.http.post(MyTools.UrlRootApi+"/News/Add",s,{
      responseType:"text",
      withCredentials:false
     });
  }

  EditOne(s:FormData){
    return this.http.put(MyTools.UrlRootApi+"/News/EditOne",s,{
      responseType:"text",
      withCredentials:false
     });
  }


  DeleteOne(id:number){
    return this.http.delete(MyTools.UrlRootApi+"/News/Delete/"+id,{
      responseType:"text"
     });
  }
  
}
