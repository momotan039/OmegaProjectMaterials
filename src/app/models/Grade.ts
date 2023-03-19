import { Test } from './Test';
import { Group } from 'src/app/models/Group';
import { User } from 'src/app/models/User';
export class Grade {
  id?:number
  studentId?:number
  sumGrade?:number
  groupId?:number
  testId?:number
  note?:string
  student?:User
  group?:Group
  test?:Test
}

