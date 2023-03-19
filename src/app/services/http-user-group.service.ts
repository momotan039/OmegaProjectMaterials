import { UserGroup } from 'src/app/models/UsersGroups';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { MyTools } from '../constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpUserGroupService {

  constructor(private http:HttpClient) { }

  AddUsersToGroup(ugs:UserGroup[]){
    return this.http.post(MyTools.UrlRootApi+"/UsersGroups/AddUsersToGroup",ugs,{
      responseType:"text"
    });
  }
  DeleteUserFromGroup(id:number){
    return this.http.delete(MyTools.UrlRootApi+"/UsersGroups/DeleteUserFromGroup/"+id,{
      responseType:"text"
    });
  }
  GetFreindsByUser(){
    return this.http.get<User[]>(MyTools.UrlRootApi+"/Users/GetFreindsByUser")
  }
}
