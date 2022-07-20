import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllMaterialsModule } from './Materials/AllMaterials.module';
import { UsersTableComponent } from './users-table/users-table.component';
import { MessageDialogComponent } from './dilogs/message-dialog/message-dialog.component';
import { EditUserComponent } from './dilogs/edit-user/edit-user.component';
import { DeleteUserComponent } from './dilogs/delete-user/delete-user.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AddUserComponent } from './dilogs/add-user/add-user.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './Components/users/users.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { AdminsComponent } from './Components/admins/admins.component';
import { GroupsComponent } from './Components/groups/groups.component';
import { UserDetailsComponent } from './Components/Details/user-details/user-details.component';
import { GroupsDetailsComponent } from './Components/Details/groups-details/groups-details.component';
import { AddGroupComponent } from './dilogs/add-group/add-group.component';
import { EditGroupComponent } from './dilogs/edit-group/edit-group.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { AddCourseComponent } from './dilogs/add-course/add-course.component';
import { EditCourseComponent } from './dilogs/edit-course/edit-course.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { HomeComponent } from './Components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    AddUserComponent,
    MessageDialogComponent,
    EditUserComponent,
    DeleteUserComponent,
    HeaderComponent,
    UsersComponent,
    TeachersComponent,
    AdminsComponent,
    GroupsComponent,
    UserDetailsComponent,
    GroupsDetailsComponent,
    AddGroupComponent,
    EditGroupComponent,
    CoursesComponent,
    AddCourseComponent,
    EditCourseComponent,
    LogInComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AllMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
