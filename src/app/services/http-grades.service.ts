import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Grade } from '../models/Grade';

@Injectable({
  providedIn: 'root'
})
export class HttpGradesService {
  constructor(
    private http:HttpClient
  ) { }
 GetGrades(){
  return this.http.get<any>("https://localhost:44327/api/Grades/GetGrades");
 }
 PostGrades(g:Grade){
  return this.http.post("https://localhost:44327/api/Grades/SendGrade",g,{
    responseType:"text"
  });
 }
EditGrades(g:Grade){
  return this.http.put("https://localhost:44327/api/Grades/EditGrade",g,{
    responseType:"text"
  });
 }

 DeleteGrade(id:number){
  return this.http.delete("https://localhost:44327/api/Grades/DeleteGrade/"+id,{
    responseType:"text"
  });
 }
}
