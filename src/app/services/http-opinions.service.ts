import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpOpinionsService {
  constructor(private http:HttpClient){
  }
  GetAll(){
    return  this.http.get<any>(MyTools.UrlRootApi+"/Opinions/GetAll");
  }


  AddOne(s:any){
    return this.http.post(MyTools.UrlRootApi+"/Opinions/Add",s,{
      responseType:"text",
     });
  }

  EditOne(s:any){
    return this.http.put(MyTools.UrlRootApi+"/Opinions/EditOne",s,{
      responseType:"text",
     });
  }

  DeleteOne(id:number){
    return this.http.delete(MyTools.UrlRootApi+"/Opinions/Delete/"+id,{
      responseType:"text"
     });
  }
}
