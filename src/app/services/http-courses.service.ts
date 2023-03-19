import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { MyTools } from 'src/app/constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpCoursesService {

  constructor(private http:HttpClient) { }

  GetCourses():Observable<Course[]>{
  return  this.http.get<Course[]>(MyTools.UrlRootApi+"/Courses/GetCourses/");
}
GetCourseById(id:string){
  return this.http.get<Course>(MyTools.UrlRootApi+"/Courses/GetCourseById/"+id);
}
  GetCoursesByUserId(id:number){
  return  this.http.get<Course[]>(MyTools.UrlRootApi+"/Courses/GetCoursesByUserId/"+id);
}

 PostCourse(course:Course){
    return this.http.post(MyTools.UrlRootApi+"/Courses/PostCourse",course,{
      responseType:"text"
    })
}
 DeleteCourse(id:number){
  return  this.http.delete(MyTools.UrlRootApi+"/Courses/DeleteCourse/"+id,{
    responseType:"text"
  })
}

 EditingCourse(course:Course){
  return  this.http.put(MyTools.UrlRootApi+"/Courses/EditCourse",course,{
    responseType:"text"
  })
}

}
