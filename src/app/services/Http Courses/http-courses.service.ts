import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/Course';

@Injectable({
  providedIn: 'root'
})
export class HttpCoursesService {

  constructor(private http:HttpClient) { }

  GetCourses():Observable<Course[]>{
  return  this.http.get<Course[]>("https://localhost:44327/api/Courses/GetCourses/");
}
GetCourseById(id:string){
  return this.http.get<Course>("https://localhost:44327/api/Courses/GetCourseById/"+id);
}
  GetCoursesByUserId(id:number):Observable<Course>{
  return  this.http.get<Course>("https://localhost:44327/api/Courses/GetCoursesByUserId/"+id);
}

 PostCourse(course:Course){
    return this.http.post("https://localhost:44327/api/Courses/PostCourse",course,{
      responseType:"text"
    })
}
 DeleteCourse(id:number){
  return  this.http.delete("https://localhost:44327/api/Courses/DeleteCourse/"+id,{
    responseType:"text"
  })
}

 EditingCourse(course:Course){
  return  this.http.put("https://localhost:44327/api/Courses/EditCourse",course,{
    responseType:"text"
  })
}

}
