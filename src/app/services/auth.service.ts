import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
  login(credentials: ICredentials) {
    return this.client.POST(`${environment.apiroot}${Auth.login}`, {...credentials});
  }

  signup(user: IUser, accountData: IAccount) {
    return this.client.POST(`${Auth.signup}`, {user, account: accountData})
  }

  getMembersList() {
    return this.client.POST(`${Auth.members}`);
  }

  updateMemberDetails(_id: string, account: IAccount)  {
    return this.client.POST(`${Auth.updateMember}`, {_id, updateData: account})
  }

  deleteUser(_id: string) {
    return this.client.POST(`${Auth.deleteUser}`, {_id})
  }
}