import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  /**
   * @returns http response observable
   * @param { object } user
   */
  signUpUser(user: object) {
    return this.http.post('/api/user/signup', user);
  }
}
