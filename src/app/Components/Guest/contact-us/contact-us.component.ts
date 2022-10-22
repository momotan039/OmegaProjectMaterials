import { HttpContactUsService } from './../../../services/http-contact-us.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MyTools } from 'src/app/constants/MyTools';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(
     private fb:FormBuilder,
     private httpContactUs:HttpContactUsService
  ) { }
  fg=this.fb.group({
    name:['',Validators.required],
    phone:['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
    email:['',Validators.compose([Validators.required,Validators.email])],
    message:['',Validators.required],
  })
  ngOnInit(): void {
  }
  Send(){

    if(!this.fg.valid)
  return;

  this.httpContactUs.AddOne(this.fg.value).subscribe(data=>{
    MyTools.ShowResult200Message(data)
    this.fg.reset()
  },(err)=>{
    MyTools.ShowFialdMessage(err,"Sending Message")
    })

  }
}
