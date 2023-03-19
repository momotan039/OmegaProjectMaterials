import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { MyTools } from '../constants/MyTools';
import { Grade } from '../models/Grade';

@Injectable({
  providedIn: 'root'
})
export class HttpGradesService {
  constructor(
    private http:HttpClient
  ) { }

  GetGradesByTest(id:number){
  return this.http.get<any>(MyTools.UrlRootApi+"/Grades/GetGradesByTest/"+id);
 }

 GetGrades(){
  return this.http.get<any>(MyTools.UrlRootApi+"/Grades/GetGrades");
 }

 PostGrades(g:Grade){
  return this.http.post(MyTools.UrlRootApi+"/Grades/SendGrade",g,{
    responseType:"text"
  });
 }
EditGrades(g:Grade){
  return this.http.put(MyTools.UrlRootApi+"/Grades/EditGrade",g,{
    responseType:"text"
  });
 }

 DeleteGrade(id:number){
  return this.http.delete(MyTools.UrlRootApi+"/Grades/DeleteGrade/"+id,{
    responseType:"text"
  });
 }
}
