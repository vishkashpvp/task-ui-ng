import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private localStorageService: LocalStorageService) {}

  /**
   * @returns users array from local storage
   */
  getAllUsers() {
    let users = this.localStorageService.get('users');
    return users ? JSON.parse(users) : [];
  }

  /**
   * @summary Adds new user object to existing users array
   * @param user
   */
  setLocalUser(user: UserModel) {
    let users = this.getAllUsers();
    users.push(user);
    let userString = JSON.stringify(user);
    let usersString = JSON.stringify(users);
    this.localStorageService.set('usersCount', users.length);
    this.localStorageService.set('currentUser', userString);
    this.localStorageService.set('users', usersString);
    this.localStorageService.set('isSignedIn', 'true');
  }
}
