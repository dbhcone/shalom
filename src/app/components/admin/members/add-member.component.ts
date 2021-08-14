import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { UserAccountHelper } from 'src/app/helpers/functions/user.helper';
import { IAccount, IUser } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-member',
    templateUrl: './add-member.component.html',
    styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
    memberForm;
    constructor(
        private formBuilder: FormBuilder,
        private auth: AuthService,
        public dialogRef: MatDialogRef<AddMemberComponent>,
        @Inject(MAT_DIALOG_DATA) public data?: any,
    ) {
        console.log('data', data);
        this.memberForm = this.formBuilder.group({
            account: this.formBuilder.group({
                email: [data?.email || null, [Validators.required, Validators.email, Validators.min(5)]],
                surname: [data?.surname || null, [Validators.required, Validators.minLength(3)]],
                firstName: [data?.firstName || null, [Validators.required, Validators.minLength(3)]],
                otherNames: [data?.otherNames || null],
                gender: [data?.gender, [Validators.required]],
                occupation: [data?.occupation || null, [Validators.minLength(5)]],
                primaryMobileNumber: [
                    data?.primaryMobileNumber || null,
                    [Validators.minLength(10), Validators.maxLength(15)],
                ],
            }),
            user: this.formBuilder.group({
                username: [data?.username || null, [Validators.required, Validators.minLength(8)]],
                password: [data?.password || null, [Validators.required, Validators.minLength(8)]],
                role: [data?.role || null, [Validators.required, Validators.minLength(4)]],
            }),
        });
    }

    ngOnInit(): void {
        console.log('on init');
        if (this.data) {
            this.memberForm.removeControl('user');
        }
    }

    roles = [
        { id: 'member', name: 'Member' },
        { id: 'admin', name: 'Admin' },
    ];

    onRoleChanged(change: MatSelectChange): void {
        console.log(change.value);
    }

    onSubmit(): void {
        console.log('this.memberForm', this.memberForm.value);
        const account: IAccount = this.account?.value;
        const user: IUser = this.user?.value;

        this.data?._id ? this.updateMemberDetails(this.data._id, account) : this.addMemberDetails(user, account);
    }

    addMemberDetails(user: IUser, account: IAccount) {
        this.auth.signup(user, account).subscribe(
            async (resp: any) => {
                console.log('resp', resp);
                Swal.fire({
                    title: resp.message,
                    icon: 'success',
                }).then(() => {
                    this.closeDialog();
                });
            },
            (err) => {
                Swal.fire({
                    title: `Error - ${err.error.code}`,
                    timer: 5000,
                    text: err.error.message,
                });
            },
        );
    }

    updateMemberDetails(_id: string, account: IAccount) {
        this.auth.updateMemberDetails(_id, account).subscribe(
            async (resp: any) => {
                console.log('resp', resp);
                Swal.fire({
                    title: resp.message,
                    icon: 'success',
                }).then(() => {
                    this.closeDialog();
                });
            },
            (err) => {
                Swal.fire({
                    title: `Error - ${err.error.code}`,
                    timer: 5000,
                    text: err.error.message,
                });
            },
        );
    }

    get account(): AbstractControl | null {
        return this.memberForm.get('account');
    }

    get user(): AbstractControl | null {
        return this.memberForm.get('user');
    }

    get firstName(): AbstractControl | null {
        return this.memberForm.get(['account', 'firstName']);
    }

    get surname(): AbstractControl | null {
        return this.memberForm.get(['account', 'surname']);
    }

    get otherNames(): AbstractControl | null {
        return this.memberForm.get('account.otherNames');
    }

    get primaryMobileNumber(): AbstractControl | null {
        return this.memberForm.get(['account', 'primaryMobileNumber']);
    }

    handleUsernameSuggestion(): void {
        const firstName: string = this.firstName?.value?.trim() || null;
        const surname: string = this.surname?.value?.trim() || null;
        const otherNames: string = this.otherNames?.value?.trim() || null;

        const username = new UserAccountHelper().generateUsername({
            surname,
            firstName,
            otherNames,
        });
        this.memberForm.get('user.username')?.setValue(username);
    }

    handlePasswordGeneration(): void {
        const mobileNumber: string = this.primaryMobileNumber?.value?.trim();
        console.log({ mobileNumber });
        this.memberForm.get('user.password')?.setValue(mobileNumber);
    }

    onUsernameChange(changeEvent: any): void {
        console.log(changeEvent.target.value);
        console.log('Username change event', changeEvent);
        console.log('change event', typeof changeEvent);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
