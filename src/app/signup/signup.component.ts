import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from './signup.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';

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
    private localStorageService: LocalStorageService
  ) {
    this.createSignUpForm();
  }

  ngOnInit(): void {}

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      mail: [
        '',
        [Validators.required, Validators.pattern('[a-zA-z0-9\\.]*@ril\\.com$')],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirm_password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  signUpUser(form: FormGroup) {
    this.signupLoading = true;

    if (!form.valid) {
      this.signupLoading = false;
      return;
    }

    if (form.value['password'] != form.value['confirm_password']) {
      this.signupLoading = false;
      return alert("passwords didn't match");
    }

    console.log(form.value);

    this.signupService.signUpUser(form.value).subscribe({
      next: (res) => {
        console.log(res);
        this.localStorageService.set('user', JSON.stringify(res));
        this.router
          .navigate([''])
          .then(() =>
            this.service.openSuccessSnackbar('Registered Successfully')
          );
      },
      error: (err) => {
        console.log(err.error);
        console.log(err.error.error);
      },
      complete: () => {
        this.signupLoading = false;
      },
    });
  }
}
