import { Role } from './Role';
import { Message } from "./Message";

export class User{
  idCard?:string;
  firstName?:string;
  lastName?:string;
  phone?:string;
  role?:Role;
  email?:string;
  password?:string;
  id?:number
  roleId?:number
  confirmPassword?:boolean
  imageProfile?:string
  messages?:Message[]
}
