import { HomeWorkFile } from './../models/HomeWorkFile';
import { Observable } from 'rxjs';
import { HomeWork } from './../models/HomeWork';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeWorkService {

constructor(
  private http:HttpClient
) { }


 SendHomeWork(homeWork:FormData){
   return this.http.post("https://localhost:44327/api/HomeWork/SendHomeWork",homeWork,{withCredentials:false})
}

 GetHomeWorks(id=-1):Observable<HomeWork|HomeWork[]>{
  if(id==-1)
  return  this.http.get<HomeWork[]>("https://localhost:44327/api/HomeWork/GetHomeWork")
  return  this.http.get<HomeWork>("https://localhost:44327/api/HomeWork/GetHomeWork/"+id)
}
GetHomeWorkByTeacherId(id:number){
return this.http.get<HomeWork[]>("https://localhost:44327/api/HomeWork/GetHomeWorkByTeacherId/"+id)
}
GetHomeWorkByStudentId(id:number){
  return this.http.get<HomeWork[]>("https://localhost:44327/api/HomeWork/GetHomeWorkByStudentId/"+id)
  }


  DownloadHomeWorkFile(hwf:HomeWorkFile){
    return this.http.get("https://localhost:44327/api/HomeWork/DownloadHomeWorkFile",{
      params:{
        "name":hwf.name,
        "groupId":hwf.groupId,
        "teacherId":hwf.teacherId
      },
      responseType:"arraybuffer"
    })
  }



}
