import { EditGradeComponent } from './../dilogs/edit-grade/edit-grade.component';
import { MessageDialogComponent } from './../dilogs/message-dialog/message-dialog.component';
import { DeleteUserComponent } from './../dilogs/delete-user/delete-user.component';
import { BehaviorSubject } from 'rxjs';
import { MyTableComponent } from './../SubComponent/my-table/my-table.component';
import { AddGradeComponent } from './../dilogs/add-grade/add-grade.component';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpGradesService } from './../../services/http-grades.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit{
  @ViewChild("refTable") myTable: MyTableComponent | undefined;

  displayedColumns=['test.name','sumGrade','student.idCard','group.name','note']
  displayedNameColumns=['Test','Grade','Id Card Student','Group','Note','Operations']

  constructor(
    public httpGradesService:HttpGradesService,
    public router:Router,
  ) { }

  ngOnInit(): void {
  }

  AddRow=()=>{
    MyTools.Dialog.open(AddGradeComponent,{
      disableClose:true
    }).afterClosed()
    .subscribe(success=>{
      if(success)
        this.myTable?.FillTableData();
    })
  }

  EditRow=() =>{
   MyTools.Dialog.open(EditGradeComponent,{
      data:this.myTable?.selectedRow
    }).afterClosed()
    .subscribe(success=>{
      if(success)
        this.myTable?.FillTableData();
    })
  }

  DeleteRow=()=>{
    const id=this.myTable?.selectedRow.id;
    MyTools.Dialog.open(DeleteUserComponent).afterClosed()
    .subscribe(success=>{
      if(success)
      this.httpGradesService.DeleteGrade(id).subscribe(message=>{
        MyTools.ShowResult200Message(message)
        this.myTable?.FillTableData();
      })
    })
  }

  FilterPredicateParent=(data: any, filter: string)=>{
    return data.test.name.includes(filter) ||
          data.student.idCard.includes(filter)||
          data.group.name.includes(filter)||
          data.sumGrade.toString().includes(filter)||
          data.note.includes(filter)
  }

  // sortingDataAccessorParent=(item: any,property: any)=>{

  // }

}
