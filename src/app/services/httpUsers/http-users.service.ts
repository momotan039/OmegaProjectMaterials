import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {

  constructor(private http:HttpClient) { }

   GetUsers(id:number=-1):Observable<User[]>{
    if(id==-1)
    return   this.http.get<User[]>("https://localhost:44327/api/Users/GetUsers/");

    return   this.http.get<User[]>("https://localhost:44327/api/Users/GetUsers/"+id);
  }
  async GetUsersByRole(role:number){
    return await this.http.get("https://localhost:44327/api/Users/GetUsersByRole/"+role).toPromise();
  }
  async GetUsersByGroupId(id:number){
    return await this.http.get("  https://localhost:44327/api/Users/GetUsersByGroupId/"+id).toPromise();
  }
  async GetFreindsByUser(Id:number){
    return await this.http.get("https://localhost:44327/api/Users/GetFreindsByUser/"+Id).toPromise();
  }
  async GetUsersNotInThisGroup(GroupId:number){
    return await this.http.get("https://localhost:44327/api/Users/GetUsersNotInThisGroup/"+GroupId).toPromise();
  }
   PostUser(user:User){
    //return await this.http.post("https://localhost:44327/api/Users/PostUser",user).toPromise();
      return this.http.post("https://localhost:44327/api/Users/PostUser",user);
  }

   DeleteUser(id:number){
    return  this.http.delete("https://localhost:44327/api/Users/DeleteUser/"+id)
}
 EditingUser(user:User){
  return  this.http.put("https://localhost:44327/api/Users/EditUser",user)
}}
