import { TestsComponent } from './../../tests/tests.component';
import { Test } from './../../../models/Test';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpTestsService } from 'src/app/services/HttpTests.service';
import { MyTools } from 'src/app/constants/MyTools';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {
  fg=new FormGroup({})
  constructor(
    private httpTestsService:HttpTestsService,
    private dialogRef:MatDialogRef<TestsComponent>,
    private fb:FormBuilder,

    @Inject(MAT_DIALOG_DATA) private data:Test
  ) {
    this.fg=this.fb.group({
      name:[data.name,Validators.required],
      date:[data.date,Validators.required],
      fullGrade:[data.fullGrade,Validators.required],
      minGrade:[data.minGrade,Validators.required],
      id:[data.id]
    })
  }

  ngOnInit(): void {
  }
  SaveRecord(){
    if(!this.fg.valid)
return;

let date=new Date(this.fg.get("date")?.value)
this.fg.get("date")?.setValue(date.toLocaleDateString())

this.httpTestsService.EditTest(this.fg.value).subscribe(data=>{
  MyTools.ShowResult200Message(data)
  this.dialogRef.close(true);
},(err)=>{
  MyTools.ShowFialdMessage(err,"Editing Test")
  })
}
}
