import { OpinionsComponent } from './../../admin/opinions/opinions.component';
import { HttpOpinionsService } from './../../../services/http-opinions.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';

@Component({
  selector: 'app-add-opinion',
  templateUrl: './add-opinion.component.html',
  styleUrls: ['./add-opinion.component.css']
})
export class AddOpinionComponent implements OnInit {
 
  constructor(
    private fb:FormBuilder,
    private httpOpinionsService:HttpOpinionsService,
    private dialogRef:MatDialogRef<OpinionsComponent>,
  ) { }
  fg=this.fb.group({
    name:['',Validators.required],
    content:['',Validators.required],
    about:['',Validators.required],
  })
  ngOnInit(): void {
  }

  SaveUser(){
  if(!this.fg.valid)
    return;


    this.httpOpinionsService.AddOne(this.fg.value).subscribe(data=>{
      MyTools.ShowResult200Message(data)
      this.dialogRef.close(true);
    },(err)=>{
      MyTools.ShowFialdMessage(err,"Adding Opinion")
      })
  }

}
