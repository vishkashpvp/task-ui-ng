import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService
  ) {}

  /**
   * @summary Checks if there is an account with the user mail
   * @param {UserModel} user
   * @returns boolean
   */
  validSignup(user: any) {
    let new_mail: string = user.usermail;

    let mail_index = this.userService
      .getAllUsers()
      .findIndex((user: UserModel) => {
        return user.mail.toLowerCase() === new_mail.toLowerCase();
      });

    if (mail_index !== -1) {
      console.log('Mail already exists');
      window.alert('Mail already exists');
      return false;
    }

    return true;
  }
}
