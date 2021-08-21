import { Injectable, OnInit } from '@angular/core';
import { Auth, Payments } from '../api/endpoints';
import { IAccount, ICredentials, IUser } from '../interfaces/auth.interface';
import { Client } from '../utils/client';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnInit {

    constructor(private client: Client) {}

    ngOnInit(): void {
        // user.isAdmin = true;
    }
    login(credentials: ICredentials) {
        return this.client.POST(`${Auth.login}`, { ...credentials });
    }

    signup(user: IUser, accountData: IAccount) {
        return this.client.POST(`${Auth.signup}`, { user, account: accountData });
    }

    getMembersList() {
        return this.client.POST(`${Auth.members}`);
    }
    updateMemberDetails(_id: string, account: IAccount) {
        return this.client.POST(`${Auth.updateMember}`, { _id, updateData: account });
    }

    deleteUser(_id: string) {
        return this.client.POST(`${Auth.deleteUser}`, { _id });
    }

    setToken(token: string) {
        const promise = new Promise((resolve, reject) => {
            localStorage.setItem('access-token', token);
            resolve('token');
        });
        return promise;
    }

    getToken(): string | null {
        return localStorage.getItem('access-token');
    }

    data(): IUser {
        const jwtHelper = new JwtHelperService();
        const token = this.getToken() || undefined;

        const decodedToken = jwtHelper.decodeToken(token);
        // const expirationDate = jwtHelper.getTokenExpirationDate(token);
        // const isExpired = jwtHelper.isTokenExpired(token);
        return decodedToken;
    }

    get isAdmin() {
        return this.data().role === 'admin';
    }

    getMembersStats () {
        return this.client.GET(`${Auth.membersstats}`)
    }

    
}
