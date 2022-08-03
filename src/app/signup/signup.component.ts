import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  toggleEye: boolean = true;
  signupLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AppService,
    private signupService: SignupService,
    private router: Router,
    private userService: UserService
  ) {
    this.createSignUpForm();
  }

  ngOnInit(): void {}

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
      usermail: ['', [Validators.required, Validators.pattern('[a-zA-z0-9\\.]*@ril\\.com$')],],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  signUpUser(form: FormGroup) {
    this.signupLoading = true;

    if (!form.valid) {
      this.signupLoading = false;
      return alert('missing values in the signup form');
    }

    if (form.value['password'] != form.value['confirm_password']) {
      this.signupLoading = false;
      return alert("passwords didn't match");
    }

    console.log(form.value);
    let result = this.signupService.validSignup(form.value);

    if (!result) {
      this.signupLoading = false;
      return this.service.openFailSnackbar('Signup Failed');
    }

    let newUser = new UserModel();
    newUser.name = form.value.username;
    newUser.mail = form.value.usermail;
    newUser.password = form.value.password;

    this.userService.setLocalUser(newUser);

    this.signupLoading = false;
    this.router
      .navigate([''])
      .then(() => this.service.openSuccessSnackbar('Registered Successfully'));
  }
}
