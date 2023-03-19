import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpTopSliderService {

 
  constructor(private http:HttpClient) { }
  GetAll(){
    return  this.http.get<any>(MyTools.UrlRootApi+"/TopSliderImages/GetAll");
  }

  GetOne(id: string) {
    return  this.http.get<any>(MyTools.UrlRootApi+"/TopSliderImages/GetOne/"+id);
  }

  AddOne(s:FormData){
    return this.http.post(MyTools.UrlRootApi+"/TopSliderImages/Add",s,{
      responseType:"text",
      withCredentials:false
     });
  }

  EditOne(s:FormData){
    return this.http.put(MyTools.UrlRootApi+"/TopSliderImages/EditOne",s,{
      responseType:"text",
      withCredentials:false
     });
  }


  DeleteOne(id:number){
    return this.http.delete(MyTools.UrlRootApi+"/TopSliderImages/Delete/"+id,{
      responseType:"text"
     });
  }
}
