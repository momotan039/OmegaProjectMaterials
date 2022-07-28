import { Group } from './../../../models/Group';
import { HttpGroupsService } from './../../../services/http Groups/http-groups.service';
import { HttpCoursesService } from 'src/app/services/Http Courses/http-courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  constructor(
    private route:ActivatedRoute,
    private http:HttpCoursesService,
    private httpGroup:HttpGroupsService,
    ) { }
  course=new Course();
  groups:Group[]=[]
  ngOnInit(): void {

    let id=this.route.snapshot.paramMap.get("id")
  this.http.GetCourseById(id!).subscribe(c=>{
  this.course=c;

  this.httpGroup.GetGroupsByCourseId(this.course.id).subscribe(data=>{
    this.groups=data
      })
  })

  }

}
