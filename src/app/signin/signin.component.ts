import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninService } from './signin.service';
import { AppService } from '../app.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  toggleEye: boolean = true;
  signinLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
    private employeeService: EmployeeService,
    private userService: UserService,
    private signinService: SigninService
  ) {
    this.createSignInForm();
  }

  ngOnInit(): void {}

  createSignInForm() {
    this.signInForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signInUser(form: FormGroup) {
    if (!form.valid) {
      console.log('form is not complete');
      return;
    }

    this.signinLoading = true;

    this.signinService.signInUser(form.value).subscribe({
      next: (value) => {
        this.userService.updateCurrentUser(value);
        this.appService.openSuccessSnackbar('Signin Successful');
        this.signinLoading = false;
        this.router.navigate(['']).then((r) => console.log(r));
      },
      error: (err) => {
        console.log(err);
        if (err.status === 503) {
          this.appService.openFailSnackbar(`${err.status} ${err.statusText}`);
        } else {
          this.appService.openFailSnackbar(err.error.error);
        }
        this.signinLoading = false;
      },
    });
  }
}
