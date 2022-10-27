import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpActivityService } from 'src/app/services/http-activity.service';
import { NewsActivitiesComponent } from '../../Guest/news-activities/news-activities.component';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private httpActivityService:HttpActivityService,
    private dialogRef:MatDialogRef<NewsActivitiesComponent>,
  ) { }

  fg=this.fb.group({
    title:['',Validators.required],
    date:['',Validators.required],
    describe:['',Validators.required],
  })

  ngOnInit(): void {
  }
  SaveUser(file:any){
    if(!this.fg.valid)
      return;
  
       //Start change dates to current offset of timezone
  let date=this.fg.get("date")?.value as Date
  this.fg.get("date")?.setValue(date.toLocaleDateString())

  
      let fd=new FormData();
      fd.append("title",this.fg.get("title")?.value)
      fd.append("date",this.fg.get("date")?.value)
      fd.append("describe",this.fg.get("describe")?.value)
      fd.append("file",file[0] as File)
  
      this.httpActivityService.AddOne(fd).subscribe(data=>{
        MyTools.ShowResult200Message(data)
        this.dialogRef.close(true);
      },(err)=>{
        MyTools.ShowFialdMessage(err,"Adding Actvity|News")
        })
    }
}
