import { CourseDetailsComponent } from './Components/Details/course-details/course-details.component';
import { GroupsDetailsComponent } from './Components/Details/groups-details/groups-details.component';
import { UserDetailsComponent } from './Components/Details/user-details/user-details.component';
import { HomeworksComponent } from './Components/homeworks/homeworks.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { StudentsComponent } from './Components/students/students.component';
import { HomeComponent } from './Components/home/home.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { AdminsComponent } from './Components/admins/admins.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {"component":AdminsComponent,"path":"admins",canActivate:[AuthGuardService]},
  {"component":StudentsComponent,"path":"students",canActivate:[AuthGuardService]},
  {"component":TeachersComponent,"path":"teachers",canActivate:[AuthGuardService]},
  {"component":CoursesComponent,"path":"courses",canActivate:[AuthGuardService]},
  {"component":GroupsComponent,"path":"groups",canActivate:[AuthGuardService]},
  {"component":MessagesComponent,"path":"messages",canActivate:[AuthGuardService]},
  {"component":HomeworksComponent,"path":"homeWorks",canActivate:[AuthGuardService]},
  {component:UserDetailsComponent,"path":"userDetails/:id",canActivate:[AuthGuardService]},
  {component:GroupsDetailsComponent,"path":"groupDetails/:id",canActivate:[AuthGuardService]},
  {component:CourseDetailsComponent,"path":"courseDetails/:id",canActivate:[AuthGuardService]},
  {"component":LogInComponent,"path":"login"},
  {component:HomeComponent,path:"home",canActivate:[AuthGuardService]},
  {pathMatch: "full",component:HomeComponent,path:"",canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
