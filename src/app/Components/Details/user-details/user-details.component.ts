import { HomeWorkStudentService } from './../../../services/home-work-student.service';
import { MyLocalStorage } from './../../../services/MyLocalStorage';
import { StudentsComponent } from './../../admin/students/students.component';
import { HomeComponent } from './../../home/home.component';
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
import { ActivatedRoute, Router } from '@angular/router';
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
    private homeWorkStudentService:HomeWorkStudentService,
    private matSnackBar:MatSnackBar,
    private router:Router
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
      // refImg.src=this.GetImageProfile()
      refImg.src=this.GetImageProfile()+"?t="+new Date().getSeconds()
      this.authService.LoadUserByToken();
    },(err)=>MyTools.ShowFialdMessage(err,"Changing Profile Image"))
  }

  ShowPopUPImage(){
    MyTools.ShowPopUpImageDialog(
      this.GetImageProfile()+"?t="+new Date().getSeconds());
  }

  ShowDefultImage(image:HTMLImageElement){
    
    image.src="../../../assets/images/profile.svg"
  }


  
GetDataChart1=async ():Promise<any>=>{
  let dataChart1:any = {
    datasets: [
      {
        label: 'Done',
      },
    ]
  }

  await this.homeWorkStudentService.GetHomeWorkStatistics(this.user.id).forEach(data=>{
        dataChart1.labels=data.groups
    dataChart1.datasets[0].data=data.counts
   })

  return  dataChart1
 }


 GetDataChart2=async ():Promise<any>=>{
  let dataChart1:any = {
    labels:['Jen','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Presents Group1',
        data:[1,0.5,0.7,1,0.2]
      },
      {
        label: 'Presents Group2',
        data:[0.2,1,0.3,0.8,1]
      },
    ]
  }
  // await this.httpAttendanceService.GetAttendanceStatistics(this.groupId).forEach(data=>{
  //       dataChart1.labels=data.months
  //   dataChart1.datasets[0].data=data.counts
  //  })

  return   dataChart1
 }

}
