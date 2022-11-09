import { OpinionsComponent } from './../../admin/opinions/opinions.component';
import { HttpOpinionsService } from './../../../services/http-opinions.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';

@Component({
  selector: 'app-edit-opinion',
  templateUrl: './edit-opinion.component.html',
  styleUrls: ['./edit-opinion.component.css']
})
export class EditOpinionComponent implements OnInit {

  
  fg=new FormGroup({})
  constructor(
    private dialogRef:MatDialogRef<OpinionsComponent>,
    private fb:FormBuilder,
    private httpOpinionsService:HttpOpinionsService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.fg=this.fb.group({
      name:[data.name,Validators.required],
      content:[data.content,Validators.required],
      about:[data.about,Validators.required],
      id:[data.id,Validators.required],
    })
  }
  ngOnInit(): void {
  }

  SaveUser(){
  if(!this.fg.valid)
    return;
    this.httpOpinionsService.EditOne(this.fg.value).subscribe(data=>{
      MyTools.ShowResult200Message(data)
      this.dialogRef.close(true);
    },(err)=>{
      MyTools.ShowFialdMessage(err,"Editing Member")
      })
  }

}
