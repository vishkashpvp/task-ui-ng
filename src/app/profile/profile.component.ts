import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser;
  profileForm!: FormGroup;
  updateLoading: boolean = false;
  toggleEye: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.currentUser = userService.getCurrentUser();
    this.createProfileForm();
  }

  ngOnInit(): void {}

  createProfileForm() {
    this.profileForm = this.fb.group({
      name: [
        this.currentUser.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      password: ['12345', [Validators.required, Validators.minLength(5)]],
    });
  }

  updateProfile(form: FormGroup) {
    this.updateLoading = true;

    if (!form.valid) {
      this.updateLoading = false;
      return;
    }

    if (form.value.name === this.currentUser.name) {
      delete form.value.name;
    }

    form.value._id = this.currentUser._id;

    console.table(form.value);

    this.updateLoading = false;
  }
}
