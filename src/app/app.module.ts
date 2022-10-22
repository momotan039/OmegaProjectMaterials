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
import { AddGradeComponent } from './Components/dilogs/add-grade/add-grade.component';
import { EditGradeComponent } from './Components/dilogs/edit-grade/edit-grade.component';
import { AddUserComponent } from './Components/dilogs/add-user/add-user.component';
import { TestsComponent } from './Components/tests/tests.component';
import { AddTestComponent } from './Components/dilogs/add-test/add-test.component';
import { EditTestComponent } from './Components/dilogs/edit-test/edit-test.component';
import { ConfirmRegistrationComponent } from './Components/Account/confirm-registration/confirm-registration.component';
import { ForgetPasswordDialogComponent } from './Components/Account/forget-password-dialog/forget-password-dialog.component';
import { ResetPasswordDialogComponent } from './Components/Account/reset-password-dialog/reset-password-dialog.component';
import { TestDetailsComponent } from './Components/Details/test-details/test-details.component';
import { AddHomeworkComponent } from './Components/dilogs/add-homework/add-homework.component';
import { EditHomeworkComponent } from './Components/dilogs/edit-homework/edit-homework.component';
import { ShowSubmitedFilesStudentComponent } from './Components/dilogs/show-submited-files-student/show-submited-files-student.component';
import { SelectWithSearchComponent } from './Components/select-with-search/select-with-search.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ChartComponent } from './Components/SubComponent/chart/chart.component';
import { MainComponent } from './Components/Guest/main/main.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AboutUsComponent } from './Components/Guest/about-us/about-us.component';
import { GuestHeaderComponent } from './Components/Guest/guest-header/guest-header.component';
import { TopPageComponent } from './Components/Guest/top-page/top-page.component';
import { ContactUsComponent } from './Components/Guest/contact-us/contact-us.component';
import { NewsActivitiesComponent } from './Components/Guest/news-activities/news-activities.component';
import { OurStaffComponent } from './Components/Guest/our-staff/our-staff.component';
import { OurCoursesComponent } from './Components/Guest/our-courses/our-courses.component';
import { PsychometryComponent } from './Components/Guest/our-courses/psychometry/psychometry.component';
import { OmegaGoldComponent } from './Components/Guest/our-courses/omega-gold/omega-gold.component';
import { HebrewAComponent } from './Components/Guest/our-courses/hebrew-a/hebrew-a.component';
import { HebrewBComponent } from './Components/Guest/our-courses/hebrew-b/hebrew-b.component';
import { HebrewCComponent } from './Components/Guest/our-courses/hebrew-c/hebrew-c.component';
import { HebrewDComponent } from './Components/Guest/our-courses/hebrew-d/hebrew-d.component';
import { GuestAppComponent } from './Components/Guest/guest-app/guest-app.component';
import { GuestFooterComponent } from './Components/Guest/guest-footer/guest-footer.component';
import { NotFoundPageComponent } from './Components/not-found-page/not-found-page.component';
import { InquiriesComponent } from './Components/admin/inquiries/inquiries.component';
import { ContactUsDialogComponent } from './Components/dilogs/contact-us-dialog/contact-us-dialog.component';
import { StaffComponent } from './Components/admin/staff/staff.component';

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
    AddGradeComponent,
    EditGradeComponent,
    AddUserComponent,
    TestsComponent,
    AddTestComponent,
    EditTestComponent,
    ConfirmRegistrationComponent,
    ForgetPasswordDialogComponent,
    ResetPasswordDialogComponent,
    TestDetailsComponent,
    AddHomeworkComponent,
    EditHomeworkComponent,
    ShowSubmitedFilesStudentComponent,
    SelectWithSearchComponent,
    FooterComponent,
    ChartComponent,
    MainComponent,
    AboutUsComponent,
    GuestHeaderComponent,
    TopPageComponent,
    ContactUsComponent,
    NewsActivitiesComponent,
    OurStaffComponent,
    OurCoursesComponent,
    PsychometryComponent,
    OmegaGoldComponent,
    HebrewAComponent,
    HebrewBComponent,
    HebrewCComponent,
    HebrewDComponent,
    GuestAppComponent,
    GuestFooterComponent,
    NotFoundPageComponent,
    InquiriesComponent,
    ContactUsDialogComponent,
    StaffComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AllMaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    CarouselModule,
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
