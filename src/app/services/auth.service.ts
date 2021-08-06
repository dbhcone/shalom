import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../api/endpoints';
import { IAccount, ICredentials, IUser } from '../interfaces/auth.interface';
import { Client } from '../utils/client';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  static client: any;
  constructor(private client: Client) {}

  ngOnInit(): void {
    // user.isAdmin = true;
  }
  login(credentials: ICredentials) : Observable<Object> {
    return this.client.POST(Auth.login, {...credentials});
  }

  signup(user: IUser, accountData: IAccount) : Observable<Object> {
    return this.client.POST(Auth.signup, {user, account: accountData})
  }

  getMembersList() : Observable<Object> {
    return this.client.POST(Auth.members);
  }
}