import { MyTools } from 'src/app/constants/MyTools';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeWorkStudentService {

  constructor(
    private http:HttpClient
  ) { }

  GetSubmitedHomeworkById(id:number){
    return this.http.get<any[]>(MyTools.UrlRootApi+"/HomeWorkStudents/GetSubmitedHomeworkById/"+id)
  }

  Submit(data:FormData){
    return this.http.post(MyTools.UrlRootApi+"/HomeWorkStudents/SubmitFiles/"
    ,data,{
      responseType:"text"
    })

  }

  DownloadFile(name:string,groupId:number,studentId:number,homeworkId:number){
    return this.http.get(MyTools.UrlRootApi+"/HomeWorkStudents/DownloadFile/",{
      params:{
        "name":name,
        "groupId":groupId,
        "studentId":studentId,
        "homeworkId":homeworkId
      },
      responseType:"arraybuffer"
    })
  }
}
