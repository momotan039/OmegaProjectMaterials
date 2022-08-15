import { UserGroup } from 'src/app/models/UsersGroups';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpUserGroupService {

  constructor(private http:HttpClient) { }

  AddUsersToGroup(ugs:UserGroup[]){
    return this.http.post("https://localhost:44327/api/UsersGroups/AddUsersToGroup",ugs,{
      responseType:"text"
    });
  }
  DeleteUserFromGroup(id:number){
    return this.http.delete("https://localhost:44327/api/UsersGroups/DeleteUserFromGroup/"+id,{
      responseType:"text"
    });
  }
  GetFreindsByUser(){
    return this.http.get<User[]>("https://localhost:44327/api/Users/GetFreindsByUser")
  }
}
