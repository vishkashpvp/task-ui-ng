import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  constructor(private http: HttpClient) {}

  /**
   * @returns http response observable
   * @param { object } user
   */
  signInUser(user: object) {
    return this.http.post('/api/user/signin', user);
  }

}
