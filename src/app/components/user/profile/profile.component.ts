import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccountHelper } from 'src/app/helpers/functions/user.helper';
import { IProfile } from 'src/app/interfaces/auth.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'user-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    userdata: any;
    constructor(private activatedRoute: ActivatedRoute, private user: UserService) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        console.log('id', id);

        if (!id) {
            /**
             * TODO:
             * No id found in params. Resort to the currently logged in user
             * If this is not found, redirect to login
             */
        } else {
            this.getUserData(id);
        }
    }

    ngOnInit(): void {}

    getUserData(id: string) {
        this.user.getUserData(id).subscribe(
            (res) => {
                this.userdata = res.data;
                console.log('this.userdata', this.userdata);
            },
            (err) => {
              console.log( err.error.message)
            },
        );
    }

    fullName (data: any) : string {
        const {firstName, otherNames, surname} = data || {};
        return new UserAccountHelper().getFullName({firstName, otherNames, surname});
    }
}
