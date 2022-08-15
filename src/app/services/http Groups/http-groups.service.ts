import { Course } from './../../models/Course';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { UserGroup } from 'src/app/models/UsersGroups';

@Injectable({
  providedIn: 'root'
})
export class HttpGroupsService {

  constructor(private http:HttpClient) { }

    GetGroups():Observable<Group[]>{
    return  this.http.get<Group[]>("https://localhost:44327/api/Groups/GetGroups");
  }
  GetGroupByID(id:string){
    return this.http.get<Group>("https://localhost:44327/api/Groups/GetGroupByID/"+id);
  }
    GetGroupsByUserId(id=-1){
    return  this.http.get<Group[]>("https://localhost:44327/api/Groups/GetGroupsByUserId/"+id);
  }

    GetUsersGroups(groupId:number){
    return  this.http.get("https://localhost:44327/api/UsersGroups/GetUserGroups/"+groupId);
  }
   PostGroups(group:Group){
     return this.http.post("https://localhost:44327/api/Groups/PostGroup",group,{
      responseType:"text"
    })
  }
   DeleteGroups(id:number){
    return  this.http.delete("https://localhost:44327/api/Groups/DeleteGroup/"+id,{
      responseType:"text"
    })
  }

   EditingGroups(group:Group){
    return  this.http.put("https://localhost:44327/api/Groups/EditGroup",group,{
      responseType:"text"
    })
  }

   DeleteUserFromGroup(id:number){
    return  this.http.delete("https://localhost:44327/api/UsersGroups/DeleteUserFromGroup/"+id,{
      responseType:"text"
    })
  }

   AddUserToGroup(ug:UserGroup){
    return  this.http.post("https://localhost:44327/api/UsersGroups/AddUserToGroup",ug,{
      responseType:"text"
    })
  }
  GetGroupsByCourseId(id:number){
    return this.http.get<Group[]>("https://localhost:44327/api/Groups/GetGroupsByCourseId/"+id)
  }
}
