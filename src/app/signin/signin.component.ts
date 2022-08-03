import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  toggleEye: boolean = true;

  constructor(private fb: FormBuilder) {
    this.createSignInForm();
  }

  ngOnInit(): void {}

  createSignInForm() {
    this.signInForm = this.fb.group({
      usermail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signInUser(form: FormGroup) {
    if (!form.valid) {
      console.log('form is not complete');
      return;
    }
    console.log(form.value);
  }
}
