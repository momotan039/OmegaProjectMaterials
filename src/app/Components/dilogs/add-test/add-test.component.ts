import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { Test } from 'src/app/models/Test';
import { HttpTestsService } from 'src/app/services/HttpTests.service';
import { TestsComponent } from '../../tests/tests.component';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {

  fg=this.fb.group({
    name:['',Validators.required],
    date:['',Validators.required],
  })
  constructor(
    private httpTestsService:HttpTestsService,
    private dialogRef:MatDialogRef<TestsComponent>,
    private fb:FormBuilder,
  ){}

  ngOnInit(): void {
  }
  SaveRecord(){
    if(!this.fg.valid)
return;
let date=this.fg.get("date")?.value as Date
this.fg.get("date")?.setValue(date.toLocaleDateString())
this.httpTestsService.PostTest(this.fg.value).subscribe(data=>{
  MyTools.ShowResult200Message(data)
  this.dialogRef.close(true);
},(err)=>{
  MyTools.ShowFialdMessage(err,"Adding Test")
  })
}
}
