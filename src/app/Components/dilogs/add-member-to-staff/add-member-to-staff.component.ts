import { StaffComponent } from './../../admin/staff/staff.component';
import { HttpStaffService } from './../../../services/http-staff.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MyTools } from 'src/app/constants/MyTools';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member-to-staff',
  templateUrl: './add-member-to-staff.component.html',
  styleUrls: ['./add-member-to-staff.component.css']
})
export class AddMemberToStaffComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private httpStaffService:HttpStaffService,
    private dialogRef:MatDialogRef<StaffComponent>,
  ) { }
  fg=this.fb.group({
    name:['',Validators.required],
    work:['',Validators.required],
    about:['',Validators.required],
  })
  ngOnInit(): void {
  }

  SaveUser(file:any){
  if(!this.fg.valid)
    return;

    let fd=new FormData();
    fd.append("name",this.fg.get("name")?.value)
    fd.append("work",this.fg.get("work")?.value)
    fd.append("about",this.fg.get("about")?.value)
    fd.append("file",file[0] as File)

    this.httpStaffService.AddOne(fd).subscribe(data=>{
      MyTools.ShowResult200Message(data)
      this.dialogRef.close(true);
    },(err)=>{
      MyTools.ShowFialdMessage(err,"Adding Member")
      })
  }

}
