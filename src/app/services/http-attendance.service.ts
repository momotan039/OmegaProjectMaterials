import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpAttendanceService {

  constructor(
    private http:HttpClient,
    private auth:AuthService
    ) { }

  GetAll(groupId:number,date:any){

  if(date)
  return  this.http.get<any>(MyTools.UrlRootApi+"/Attendance/GetAll/"+groupId+"/"+date);

  return  this.http.get<any>(MyTools.UrlRootApi+"/Attendance/GetAll/"+groupId);
}

GetAllForUser(groupId:number,date:any){
 const userId=this.auth.currentUser.id
  if(date)
  return  this.http.get<any>(MyTools.UrlRootApi+"/Attendance/GetAllUser/"+groupId+"/"+userId+"/"+date);

  return  this.http.get<any>(MyTools.UrlRootApi+"/Attendance/GetAllUser/"+groupId+"/"+userId);
}

GetAttendanceStatistics(groupId:number,_userId?:number){
  const userId=this.auth.currentUser.id
  return  this.http.get<any>(MyTools.UrlRootApi+"/Attendance/GetAttendanceStatistics/"+groupId+"/"+_userId??userId);
}

GetAttendanceStatisticsPerMonth(groupId:number,date:Date){
  return  this.http.get<any>(MyTools.UrlRootApi+"/Attendance/GetAllUsersPerMonth/"+groupId+"/"+date);
}


GetGroups(){
  return  this.http.get<any>(MyTools.UrlRootApi+"/Attendance/GetGroups");
}

Post(cum:any){
  return this.http.post(MyTools.UrlRootApi+"/Attendance/Post",cum,{
    responseType:"text"
   });
}


}
