import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { UserGroup } from 'src/app/models/UsersGroups';
import { MyTools } from 'src/app/constants/MyTools';

@Injectable({
  providedIn: 'root'
})
export class HttpGroupsService {

  constructor(private http:HttpClient) { }

    GetGroups():Observable<Group[]>{
    return  this.http.get<Group[]>(MyTools.UrlRootApi+"/Groups/GetGroups");
  }
  GetGroupByID(id:string){
    return this.http.get<Group>(MyTools.UrlRootApi+"/Groups/GetGroupByID/"+id);
  }
    GetGroupsByUserId(id=-1){
    return  this.http.get<Group[]>(MyTools.UrlRootApi+"/Groups/GetGroupsByUserId/"+id);
  }

    GetUsersGroups(groupId:number){
    return  this.http.get(MyTools.UrlRootApi+"/UsersGroups/GetUserGroups/"+groupId);
  }
   PostGroups(group:Group){
     return this.http.post(MyTools.UrlRootApi+"/Groups/PostGroup",group,{
      responseType:"text"
    })
  }
   DeleteGroups(id:number){
    return  this.http.delete(MyTools.UrlRootApi+"/Groups/DeleteGroup/"+id,{
      responseType:"text"
    })
  }

   EditingGroups(group:Group){
    return  this.http.put(MyTools.UrlRootApi+"/Groups/EditGroup",group,{
      responseType:"text"
    })
  }

   DeleteUserFromGroup(id:number){
    return  this.http.delete(MyTools.UrlRootApi+"/UsersGroups/DeleteUserFromGroup/"+id,{
      responseType:"text"
    })
  }

   AddUserToGroup(ug:UserGroup){
    return  this.http.post(MyTools.UrlRootApi+"/UsersGroups/AddUserToGroup",ug,{
      responseType:"text"
    })
  }
  GetGroupsByCourseId(id:number){
    return this.http.get<Group[]>(MyTools.UrlRootApi+"/Groups/GetGroupsByCourseId/"+id)
  }
}
