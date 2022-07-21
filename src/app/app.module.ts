import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HttpUsersService } from './services/httpUsers/http-users.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { AuthGuardService } from './services/auth-guard.service';
import { StudentsComponent } from './Components/students/students.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { HomeworksComponent } from './Components/homeworks/homeworks.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    AddUserComponent,
    MessageDialogComponent,
    EditUserComponent,
    DeleteUserComponent,
    HeaderComponent,
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
    StudentsComponent,
    MessagesComponent,
    HomeworksComponent,
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
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true,
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
