import { HttpTopSliderService } from './../../../services/http-top-slider.service';
import { TopSliderComponent } from './../../admin/top-slider/top-slider.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyTools } from 'src/app/constants/MyTools';

@Component({
  selector: 'app-edit-top-slider-image',
  templateUrl: './edit-top-slider-image.component.html',
  styleUrls: ['./edit-top-slider-image.component.css']
})
export class EditTopSliderImageComponent implements OnInit {

 
  fg=new FormGroup({})
  constructor(
    private dialogRef:MatDialogRef<TopSliderComponent>,
    private fb:FormBuilder,
    private httpTopSliderService:HttpTopSliderService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 

    this.fg=this.fb.group({
      title:[data.title,Validators.required],
      order:[data.order,Validators.required],
      image:[data.thumbImage,Validators.required],
    })
  }
  ngOnInit(): void {
  }
  domain=MyTools.domainNameServer
  SaveUser(file:any){
    if(!this.fg.valid)
      return;
  
      let fd=new FormData();
      fd.append("id",this.data.id+"")
      fd.append("title",this.fg.get("title")?.value)
      fd.append("order",this.fg.get("order")?.value)
      fd.append("file",file[0] as File)
  
      this.httpTopSliderService.EditOne(fd).subscribe(data=>{
        MyTools.ShowResult200Message(data)
        this.dialogRef.close(true);
      },(err)=>{
        MyTools.ShowFialdMessage(err,"Editing Top Slider Image")
        })
    }
}
