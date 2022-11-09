import { Staff } from './../../../models/Staff';
import { StaffComponent } from './../../admin/staff/staff.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpStaffService } from 'src/app/services/http-staff.service';
import { MyTools } from 'src/app/constants/MyTools';

@Component({
  selector: 'app-edit-member-to-staff',
  templateUrl: './edit-member-to-staff.component.html',
  styleUrls: ['./edit-member-to-staff.component.css']
})
export class EditMemberToStaffComponent implements OnInit {
  fg=new FormGroup({})
  constructor(
    private dialogRef:MatDialogRef<StaffComponent>,
    private fb:FormBuilder,
    private httpStaffService:HttpStaffService,
    @Inject(MAT_DIALOG_DATA) public data:Staff
  ) { 
    this.fg=this.fb.group({
      name:[data.name,Validators.required],
      work:[data.work,Validators.required],
      about:[data.about,Validators.required],
    })
  }
  domain=MyTools.domainNameServer
  ngOnInit(): void {
  }

  SaveUser(file:any){
    
    if(!this.fg.valid)
      return;
  
      let fd=new FormData();
      fd.append("name",this.fg.get("name")?.value)
      fd.append("work",this.fg.get("work")?.value)
      fd.append("about",this.fg.get("about")?.value)
      fd.append("id",this.data.id+"")
      fd.append("file",file[0] as File)
  
      this.httpStaffService.EditOne(fd).subscribe(data=>{
        MyTools.ShowResult200Message(data)
        this.dialogRef.close(true);
      },(err)=>{
        MyTools.ShowFialdMessage(err,"Editing Member")
        })
    }

}
