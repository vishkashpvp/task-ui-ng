import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  toggleEye: boolean = true;

  constructor(private fb: FormBuilder) {
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
      usermail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  signUpUser(form: FormGroup) {
    if (!form.valid) {
      console.log('missing values in the signup form');
      return;
    }
    console.log(form.value);
  }
}
