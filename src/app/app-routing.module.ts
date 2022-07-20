import { HomeComponent } from './Components/home/home.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { AdminsComponent } from './Components/admins/admins.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {"component":AdminsComponent,"path":"admins"},
  {"component":AdminsComponent,"path":"students"},
  {"component":AdminsComponent,"path":"teachers"},
  {"component":CoursesComponent,"path":"courses"},
  {"component":GroupsComponent,"path":"groups"},
  {"component":AdminsComponent,"path":"messages"},
  {"component":AdminsComponent,"path":"homeWorks"},
  {"component":LogInComponent,"path":"login"},
  {"component":HomeComponent,"path":"home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
