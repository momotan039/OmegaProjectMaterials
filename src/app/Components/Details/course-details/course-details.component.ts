import { Observable } from 'rxjs';
import { Group } from './../../../models/Group';
import { HttpGroupsService } from '../../../services/http-groups.service';
import { HttpCoursesService } from 'src/app/services/http-courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  idCourse=-1
  constructor(
    public route:ActivatedRoute,
    private http:HttpCoursesService,
    public httpGroup:HttpGroupsService,
    ) { }
  course=new Course();
  groups:Group[]=[]

  ngOnInit(): void {
    this.idCourse=parseInt(this.route.snapshot.paramMap.get("id")!)
  this.http.GetCourseById(this.idCourse+"").subscribe(c=>{
  this.course=c;
  })
  }


  GetGroupsByCourseId=()=>{
    return this.httpGroup.GetGroupsByCourseId(this.course.id)
  }

}
