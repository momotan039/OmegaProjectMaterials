import { TeachersComponent } from './Components/admin/teachers/teachers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AdminsComponent } from "./Components/admin/admins/admins.component";
import { GroupsComponent } from "./Components/admin/groups/groups.component";
import { StudentsComponent } from "./Components/admin/students/students.component";
import { CourseDetailsComponent } from "./Components/Details/course-details/course-details.component";
import { GroupsDetailsComponent } from "./Components/Details/groups-details/groups-details.component";
import { UserDetailsComponent } from "./Components/Details/user-details/user-details.component";
import { AddCourseComponent } from "./Components/dilogs/add-course/add-course.component";
import { AddGroupComponent } from "./Components/dilogs/add-group/add-group.component";
import { AddUserToGroupComponent } from "./Components/dilogs/add-user-to-group/add-user-to-group.component";
import { DeleteUserComponent } from "./Components/dilogs/delete-user/delete-user.component";
import { EditCourseComponent } from "./Components/dilogs/edit-course/edit-course.component";
import { EditGroupComponent } from "./Components/dilogs/edit-group/edit-group.component";
import { EditUserComponent } from "./Components/dilogs/edit-user/edit-user.component";
import { MessageDialogComponent } from "./Components/dilogs/message-dialog/message-dialog.component";
import { HeaderComponent } from "./Components/header/header.component";
import { HomeComponent } from "./Components/home/home.component";
import { HomeworksComponent } from "./Components/homeworks/homeworks.component";
import { LogInComponent } from "./Components/log-in/log-in.component";
import { MessagesComponent } from "./Components/messages/messages.component";
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AllMaterialsModule } from './Materials/AllMaterials.module';
import { UsersTableComponent } from './Components/admin/users-table/users-table.component';
import { CoursesComponent } from './Components/admin/courses/courses.component';
import { MyGroupsComponent } from './Components/my-groups/my-groups.component';
import { HomeworkDetailsComponent } from './Components/Details/homework-details/homework-details.component';
import { HomeworkTeacherComponent } from './Components/SubComponent/homework-teacher/homework-teacher.component';
import { HomeworkStudentComponent } from './Components/SubComponent/homework-student/homework-student.component';
import { MyTableComponent } from './Components/SubComponent/my-table/my-table.component';
import { GradesComponent } from './Components/grades/grades.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    AddCourseComponent,
    MessageDialogComponent,
    EditUserComponent,
    DeleteUserComponent,
    HeaderComponent,
    HeaderComponent,
    AdminsComponent,
    GroupsComponent,
    UserDetailsComponent,
    GroupsDetailsComponent,
    AddGroupComponent,
    EditGroupComponent,
    AddCourseComponent,
    AddCourseComponent,
    EditCourseComponent,
    LogInComponent,
    HomeComponent,
    StudentsComponent,
    MessagesComponent,
    HomeworksComponent,
    CourseDetailsComponent,
    AddUserToGroupComponent,
    CoursesComponent,
    TeachersComponent,
    MyGroupsComponent,
    HomeworkDetailsComponent,
    HomeworkTeacherComponent,
    HomeworkStudentComponent,
    MyTableComponent,
    GradesComponent,
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

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
