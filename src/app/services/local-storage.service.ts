import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  /**
   * @summary sets value in local storage with provided key.
   * @param {string} key
   * @param {string} value
   */
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /**
   * @summary returns back value of local storage item with the key.
   * @param {string} key
   * @returns string
   */
  get(key: string) {
    return localStorage.getItem(key);
  }

  /**
   * @summary removes local storage item that matches with given key.
   * @param {string} key
   */
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
