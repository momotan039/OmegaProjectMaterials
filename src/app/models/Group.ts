import { Course } from './Course';
import { UserGroup } from './UsersGroups';
export class Group {
 id?:number
 name?:string
 courseId?:number//name object
 openingDate?:Date
 closingDate?:Date
 imageProfile?:string
 course?:Course
 userGroups:UserGroup[]=[]
}
Group.prototype.toString=()=>{
return "walad"
}
