import { MyTools } from 'src/app/constants/MyTools';
import { MyLocalStorage } from './MyLocalStorage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuth } from './../models/UserAuth';
import { HttpUsersService } from './http-users.service';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    currentUser=new User()
    currentUserSub:BehaviorSubject<any>=new BehaviorSubject(false)
  constructor(private http:HttpClient) {
   }

 Login(user:UserAuth){
  
   return this.http.post(MyTools.UrlRootApi+"/Authentication/Login",user,{
   responseType:"text"
  });
 }


 LogOut(){
   MyLocalStorage.RemoveToken();
 }

 LoadUserByToken(){
   let token=MyLocalStorage.GetToken()!
     this.http.get<User>(MyTools.UrlRootApi+"/Authentication/GetUserByToken").subscribe(u=>{
     this.currentUser=u
     this.currentUserSub.next(u)
    })
 }

  IsLogIn(){
    //if no teoken in localStorage
  return !!MyLocalStorage.GetToken()
 }




}
