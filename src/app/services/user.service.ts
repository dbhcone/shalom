import { Injectable } from '@angular/core';
import { User } from '../api/endpoints';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../utils/client';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
    };
    constructor(private client: Client) {}

    getUserData(id: string) {
        return this.client.POST(`${User.find}`, { _id: id });
    }

    uploadProfilePicture(photo: FormData) {
        return this.client.POST(`${User.uploadProfilePhoto}`, photo, this.httpOptions.headers);
    }
}
