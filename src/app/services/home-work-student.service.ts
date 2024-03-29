import { MyTools } from 'src/app/constants/MyTools';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeWorkStudentService {


  constructor(
    private http:HttpClient
  ) { }

  GetHomeWorkStatistics(studentId:number){
    return this.http.get<any>(MyTools.UrlRootApi+"/HomeWorkStudents/GetHomeWorkStatistics/"+studentId)
  }

  GetSubmitStudentByself(sid:number,hid:number) {
    return this.http.get<any[]>(MyTools.UrlRootApi+"/HomeWorkStudents/GetSubmitStudentByself",{
      params:{
        "studentId":sid,
        "homeworkId":hid
      }
    })
  }

  GetSubmitedStudentsById(id:number){
    return this.http.get<any[]>(MyTools.UrlRootApi+"/HomeWorkStudents/GetSubmitedStudentsById/"+id)
  }

  Submit(data:FormData){
    return this.http.post(MyTools.UrlRootApi+"/HomeWorkStudents/SubmitFiles/"
    ,data,{
      responseType:"text",
      observe:"events",
      reportProgress:true
    })

  }
  DeleteSubmited(data:any){
    
    return this.http.delete(MyTools.UrlRootApi+"/HomeWorkStudents/DeleteSubmited",{
      responseType:"text",
      body:data
    });
  }


  DownloadFile(name:string,groupId:number,studentId:number,homeworkId:number){
    return this.http.get(MyTools.UrlRootApi+"/HomeWorkStudents/DownloadFile/",{
      params:{
        "name":name,
        "groupId":groupId,
        "studentId":studentId,
        "homeworkId":homeworkId
      },
      reportProgress:true,
      observe:"response",
    })
  }

  DownloadFileByPath(path:string){
    return this.http.get(MyTools.UrlRootApi+"/HomeWorkStudents/DownloadFileByPath/",{
      params:{
        "url":path
      },
      reportProgress:true,
      responseType:"arraybuffer",
      observe:"events",
    })
  }



}
