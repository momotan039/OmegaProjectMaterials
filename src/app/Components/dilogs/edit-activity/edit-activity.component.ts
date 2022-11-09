import { HttpActivityService } from 'src/app/services/http-activity.service';
import { Component, Inject, OnInit } from '@angular/core';
import { New } from 'src/app/models/New';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { ActivitiesComponent } from '../../admin/activities/activities.component';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {

  fg=new FormGroup({})
  constructor(
    private dialogRef:MatDialogRef<ActivitiesComponent>,
    private fb:FormBuilder,
    private httpActivityService:HttpActivityService,
    @Inject(MAT_DIALOG_DATA) public data:New
  ) { 
    this.fg=this.fb.group({
      title:[data.title,Validators.required],
      date:[data.date,Validators.required],
      describe:[data.describe,Validators.required],
    })
  }
  domain=MyTools.domainNameServer
  ngOnInit(): void {
  }

  SaveUser(file:any){
    
    if(!this.fg.valid)
      return;

     //Start change dates to current offset of timezone
     let date= new Date(this.fg.get("date")?.value).toLocaleDateString();
     
         let fd=new FormData();
         fd.append("id",this.data.id+"")
         fd.append("title",this.fg.get("title")?.value)
         fd.append("date",date)
         fd.append("describe",this.fg.get("describe")?.value)
         fd.append("file",file[0] as File)
  
      this.httpActivityService.EditOne(fd).subscribe(data=>{
        MyTools.ShowResult200Message(data)
        this.dialogRef.close(true);
      },(err)=>{
        MyTools.ShowFialdMessage(err,"Editing This Activity")
        })
    }
}
