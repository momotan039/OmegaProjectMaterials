import { MyLocalStorage } from './MyLocalStorage';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuth } from './../models/UserAuth';
import { HttpUsersService } from './httpUsers/http-users.service';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   currentUser=new User()
  constructor(private http:HttpClient) {
   }

 Login(user:UserAuth){
   return this.http.post("https://localhost:44327/api/Authentication/Login",user,{
   responseType:"text"
  });
 }
 LogOut(){
   MyLocalStorage.RemoveToken();
 }

 LoadUserByToken(){
   let token=MyLocalStorage.GetToken()!
     this.http.get<User>("https://localhost:44327/api/Authentication/GetUserByToken").subscribe(u=>{
      this.currentUser=u;
    })
 }
isLogIn=new BehaviorSubject(false)

  IsLogIn(){
  return !!MyLocalStorage.GetToken()
 }

}
