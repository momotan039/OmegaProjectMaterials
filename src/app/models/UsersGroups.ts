import { Group } from "./Group";
import { User } from "./User";

export class UserGroup {
  id!:number;
  userId!:number;
  groupId!:number;
  user!:User;
  group!:Group;

  constructor(userId:number,groupId:number){
this.groupId=groupId
this.userId=userId
  }
}
