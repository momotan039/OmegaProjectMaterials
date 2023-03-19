import { TopSliderComponent } from './../../admin/top-slider/top-slider.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpTopSliderService } from 'src/app/services/http-top-slider.service';
import { MyTools } from 'src/app/constants/MyTools';

@Component({
  selector: 'app-add-top-slider-image',
  templateUrl: './add-top-slider-image.component.html',
  styleUrls: ['./add-top-slider-image.component.css']
})
export class AddTopSliderImageComponent implements OnInit {


  constructor(
    private fb:FormBuilder,
    private httpTopSliderService:HttpTopSliderService,
    private dialogRef:MatDialogRef<TopSliderComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  fg=this.fb.group({
    title:['',Validators.required],
    order:[this.data.order+1,Validators.required],
    image:['',Validators.required],
  })

  ngOnInit(): void {
  }
  SaveUser(file:any){
    if(!this.fg.valid)
      return;
  
      let fd=new FormData();
      fd.append("title",this.fg.get("title")?.value)
      fd.append("order",this.fg.get("order")?.value)
      fd.append("file",file[0] as File)
  
      this.httpTopSliderService.AddOne(fd).subscribe(data=>{
        MyTools.ShowResult200Message(data)
        this.dialogRef.close(true);
      },(err)=>{
        MyTools.ShowFialdMessage(err,"Adding Top Slider Image")
        })
    }

}
