import { UserDetailsComponent } from './../user-details/user-details.component';
import { Observable } from 'rxjs';
import { Group } from './../../../models/Group';
import { HttpGroupsService } from '../../../services/http-groups.service';
import { HttpCoursesService } from 'src/app/services/http-courses.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course';
import { MyTools } from 'src/app/constants/MyTools';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';
import { EditGroupComponent } from '../../dilogs/edit-group/edit-group.component';
import { MyTableComponent } from '../../SubComponent/my-table/my-table.component';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  idCourse=-1
  @ViewChild(MyTableComponent) myTable: MyTableComponent | undefined;

  constructor(
    public groupService:HttpGroupsService,
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

  
  EditRow=()=>{
    MyTools.Dialog.open(EditGroupComponent,{
      data:this.myTable?.selectedRow,
      disableClose:true
    }).
    afterClosed().subscribe(success=>{
      if(success)
        this.myTable!.FillTableData();
    })
  }
  
  DeleteRow=()=>{
    MyTools.Dialog.open(DeleteUserComponent,
       {
        width:"300px", disableClose:true
       }
      ).afterClosed().subscribe((success: any)=>{
      if(success)
      {
        this.groupService.DeleteGroups(this.myTable?.selectedRow.id).subscribe(d=>{
          this.myTable!.FillTableData();
          MyTools.ShowResult200Message(d)
        })
      }
    })
  }
  

}
