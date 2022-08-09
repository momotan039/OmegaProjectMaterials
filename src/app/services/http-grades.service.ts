import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
