import { IMyTable } from './../../../models/InterFace/IMyTable';
import { MyTableComponent } from './../../SubComponent/my-table/my-table.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MyTools } from "src/app/constants/MyTools";
import { Course } from "src/app/models/Course";
import { HttpCoursesService } from "src/app/services/http-courses.service";
import { AddCourseComponent } from "../../dilogs/add-course/add-course.component";
import { DeleteUserComponent } from "../../dilogs/delete-user/delete-user.component";
import { EditCourseComponent } from "../../dilogs/edit-course/edit-course.component";
import { MessageDialogComponent } from "../../dilogs/message-dialog/message-dialog.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit,IMyTable {
  dataSource:any;
  displayedColumns:any;

  @ViewChild(MyTableComponent) myTable: MyTableComponent | undefined;
  constructor(
    public courseService:HttpCoursesService,

  ) { }


  ngOnInit(): void {

  }

  EditRow=()=>{
  let dialogRef=MyTools.Dialog.open(EditCourseComponent,{
    data:this.myTable?.selectedRow,
    disableClose:true
  })
  dialogRef.afterClosed().subscribe(success=>{
    if(success)
      this.myTable!.FillTableData();
  })
}
DeleteRow=()=>{

  let dialogRef = MyTools.Dialog.open(MessageDialogComponent,{
    data:{
      'title':"Warning",
      'icon':"warning",
      "content":"All Related Groups will Deleted !!",
      'cancel':true
    }
  })

  // let dialogRef = MyTools.Dialog.open(DeleteUserComponent, {
  //   disableClose:true
  // });

  dialogRef.afterClosed().subscribe((success: any)=>{
    if(success)
    {
      this.courseService.DeleteCourse(this.myTable?.selectedRow.id).subscribe(d=>{
        this.myTable!.FillTableData();
        MyTools.ShowResult200Message(d)
      })
    }
  })
}
AddRow=()=>{

  MyTools.Dialog.open(AddCourseComponent,{
    disableClose:true
   })
  .afterClosed().subscribe(success=>{
    if(success)
      this.myTable?.FillTableData();
  })
}

FilterPredicateParent=(data: any, filter: string)=>{
  return data.name.toLowerCase().includes(filter)
}


}
