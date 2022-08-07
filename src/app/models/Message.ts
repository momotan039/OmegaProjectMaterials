import { User } from "./User"

export class Message {
  id?:number
  reciverId?:number
  senderId?:number
  contents?:string
  isOpened=false
  sender?:User
  reciver?:User
  sendingDate?:Date

  constructor(
    reciverId:number,
    senderId:number,
    content:string,
    ){
      this.reciverId=reciverId
      this.senderId=senderId
      this.contents=content
  }
}
