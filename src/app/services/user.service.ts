import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from "../interfaces/user.interface";
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private httpClient: HttpClient) {
  }

  signup({email, password}: IUser) {
    return this.httpClient.post(`${environment.apiUrl}/api/users/signup`, {email, password});
  }

  login({email, password}: IUser) {
    return this.httpClient.post(`${environment.apiUrl}/api/users/login`, {email, password});
  }
}
