import { HomeWorkFile } from './../models/HomeWorkFile';
import { Observable } from 'rxjs';
import { HomeWork } from './../models/HomeWork';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HomeWorkService {



constructor(
  private http:HttpClient
) { }

DeleteHomeWork(hw: HomeWork) {
  return this.http.delete(MyTools.UrlRootApi+"/HomeWork/DeleteHomeWork/",{
    responseType:"text",
    body:hw
  })
}

 SendHomeWork(homeWork:FormData){
   return this.http.post(MyTools.UrlRootApi+"/HomeWork/SendHomeWork",
   homeWork,
   {withCredentials:false,responseType:"text"})
}

 GetHomeWorks(id=-1):Observable<HomeWork|HomeWork[]>{
  if(id==-1)
  return  this.http.get<HomeWork[]>(MyTools.UrlRootApi+"/HomeWork/GetHomeWork")
  return  this.http.get<HomeWork>(MyTools.UrlRootApi+"/HomeWork/GetHomeWork/"+id)
}
GetHomeWorkByTeacherId(id:number){
return this.http.get<HomeWork[]>(MyTools.UrlRootApi+"/HomeWork/GetHomeWorkByTeacherId/"+id)
}
GetHomeWorkByStudentId(id:number){
  return this.http.get<HomeWork[]>(MyTools.UrlRootApi+"/HomeWork/GetHomeWorkByStudentId/"+id)
  }


  DownloadHomeWorkFile(hwf:HomeWorkFile){
    return this.http.get(MyTools.UrlRootApi+"/HomeWork/DownloadHomeWorkFile",{
      params:{
        "name":hwf.name,
        "groupId":hwf.groupId,
        "teacherId":hwf.teacherId,
        "homeworkId":hwf.id
      },
      responseType:"arraybuffer"
    })
  }



}
