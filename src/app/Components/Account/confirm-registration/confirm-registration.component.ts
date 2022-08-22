import { HomeComponent } from './../../home/home.component';
import { AuthService } from 'src/app/services/auth.service';
import { LogInComponent } from '../../log-in/log-in.component';
import { MyTools } from 'src/app/constants/MyTools';
import { HttpRegistrationService } from '../../../services/HttpRegistration.service';
import { User } from 'src/app/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpUsersService } from 'src/app/services/http-users.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css'],
})
export class ConfirmRegistrationComponent implements OnInit {
  user = new User();
  strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );

  fg = this.fb.group({
    password: ['', Validators.pattern(MyTools.passwordValidationRegex)],
    confPassword: ['', Validators.required],
    id: [this.activatedRoute.snapshot.params['id']],
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpUsersService: HttpUsersService,
    private httpRegistrationService: HttpRegistrationService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //remove scroller body
    document.body.classList.add('removeScroller');
    this.httpUsersService
      .GetUserById(this.fg.get('id')?.value)
      .subscribe((data) => {
        this.user = data;
        //Skip this Component if account Confirmed
          //or when sgin in Current user
          //or not Found User
        if (
          this.user==null||
          this.user.confirmPassword
          ) {
          MyTools.router.navigate(['/home']);
        }
      });
  }
  Confirm() {
    if (this.fg.valid) {

        this.httpRegistrationService
          .ConfirmRegistration({
            id: Number(this.fg.get('id')?.value),
            password: this.fg.get('password')?.value,
          })
          .subscribe(
            (data) => {
              this.router.navigate(['/login']);
              this.authService.LogOut()
              MyTools.ShowResult200Message(data);
            },
            (error) => {
              MyTools.ShowFialdMessage(error,"Confirm Registration");
            }
          );
    }
  }

  ShowPass(input: HTMLInputElement) {
    let type = input.type;
    if (type == 'text') type = 'password';
    else type = 'text';
    input.type = type;
  }
}
