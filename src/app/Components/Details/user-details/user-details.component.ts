import { MyTools } from 'src/app/constants/MyTools';
import { MessageDialogComponent } from './../../dilogs/message-dialog/message-dialog.component';
import { AuthService } from './../../../services/auth.service';
import { HttpUsersService } from './../../../services/http-users.service';
import { HttpAcountService } from './../../../services/http-acount.service';
import { HttpCoursesService } from 'src/app/services/http-courses.service';
import { HttpGroupsService } from '../../../services/http-groups.service';
import { Group } from './../../../models/Group';
import { User } from './../../../models/User';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/Course';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  groups:Group[]=[]
  courses:Course[]=[];
  @Input() showCurrentUserDetails=false
  user: any;
  constructor(
    private route:ActivatedRoute,
    private httpUsersService:HttpUsersService,
    private httpGroupsService:HttpGroupsService,
    private httpCoursesService:HttpCoursesService,
    public authService:AuthService,
    private httpAcountService:HttpAcountService,
    private matSnackBar:MatSnackBar
    ) { }
  ngOnInit(): void {
    
    let id=this.route.snapshot.paramMap.get("id")
    user:User

    if(!id)
    {
      this.authService.currentUserSub.subscribe(u=>{
        this.user=u
        this.httpGroupsService.GetGroupsByUserId(u.id).subscribe(data=>{
          this.groups=data
        })
        this.httpCoursesService.GetCoursesByUserId(u.id).subscribe(data=>{
          this.courses=data
        })
      })
    }
    // show detials by parmeter of url 
    else
    {
     this.httpUsersService.GetUserById(id+"").subscribe(user=>{
      this.user=user
      this.httpGroupsService.GetGroupsByUserId(user.id).subscribe(data=>{
        this.groups=data
      })
      this.httpCoursesService.GetCoursesByUserId(user.id!).subscribe(data=>{
        this.courses=data
      })
    })
    }
  }

  openSnackBar(){
    MyTools.ShowSnackBarMessage(
      "Image Profile Chganged Successfully",
      "done"
      )
  }

  GetImageProfile(){
    if(this.user.imageProfile)
        return MyTools.domainNameServer+this.user.imageProfile
    else
        return "../../../../assets/images/profile.svg"
  }

  UploadImageProfile(refFile:HTMLInputElement,refImg:HTMLImageElement){
    let fd=new FormData();
    fd.append("image",refFile.files?.item(0)!)

    this.httpAcountService.EditImageProfile(this.user.id!,fd).subscribe(res=>{
      MyTools.ShowSnackBarMessage(res,"Ok")
      //reset selected image input
      refFile.value=""
      refImg.src=this.GetImageProfile()+"?t="+new Date().getMilliseconds();
    },(err)=>MyTools.ShowFialdMessage(err,"Changing Profile Image"))
  }

  ShowPopUPImage(){
    MyTools.ShowPopUpImageDialog(
      this.GetImageProfile());
  }
}
