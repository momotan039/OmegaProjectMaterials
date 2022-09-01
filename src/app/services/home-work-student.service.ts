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
}
