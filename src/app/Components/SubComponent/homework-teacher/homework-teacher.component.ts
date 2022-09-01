import { AddHomeworkComponent } from './../../dilogs/add-homework/add-homework.component';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyTools } from 'src/app/constants/MyTools';
import { Group } from 'src/app/models/Group';
import { HomeWork } from 'src/app/models/HomeWork';
import { AuthService } from 'src/app/services/auth.service';
import { HomeWorkService } from 'src/app/services/HomeWork.service';
import { HttpGroupsService } from 'src/app/services/http-groups.service';
import { MessageDialogComponent } from '../../dilogs/message-dialog/message-dialog.component';
import { MyTableComponent } from '../my-table/my-table.component';
import { DeleteUserComponent } from '../../dilogs/delete-user/delete-user.component';

@Component({
  selector: 'app-homework-teacher',
  templateUrl: './homework-teacher.component.html',
  styleUrls: ['./homework-teacher.component.css']
})
export class HomeworkTeacherComponent implements OnInit {
  @ViewChild("refTable") myTable: MyTableComponent | undefined;

  displayedColumns=['title','group.name','sendingDate','requiredSubmit']
  displayedNameColumns=['Title','Group','Sending Date','Required Submit','Operations']
  constructor(
    public authService:AuthService,
    public homeWorkService:HomeWorkService,
  ){

  }
  ngOnInit(): void {

  }

  addRowParent=()=>{
    MyTools.Dialog.open(AddHomeworkComponent,{
      width:"600px"
    })
    .afterClosed().subscribe(success=>{
      if(success==false)
      return
      this.myTable?.FillTableData();
    })
  }

  // EditRow=() =>{
  //   MyTools.Dialog.open(EditGradeComponent,{
  //      data:this.myTable?.selectedRow
  //    }).afterClosed()
  //    .subscribe(success=>{
  //      if(success)
  //        this.myTable?.FillTableData();
  //    })
  //  }

   DeleteRow=()=>{
     const hw=this.myTable?.selectedRow;
     MyTools.Dialog.open(DeleteUserComponent).afterClosed()
     .subscribe(success=>{
       if(success)
       this.homeWorkService.DeleteHomeWork(hw).subscribe(message=>{
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

}
