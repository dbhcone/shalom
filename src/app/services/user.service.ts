import { Injectable } from '@angular/core';
import { User } from '../api/endpoints';
import { HttpClient } from '@angular/common/http';
import { Client } from '../utils/client';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client: Client) { }

  getUserData(id: string) {
    return this.client.POST(`${User.find}`, {_id: id});
}

}
