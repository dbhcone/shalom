import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RedirectService } from 'src/app/services/redirect.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    errorMessage: null;
    loginForm;
    constructor(private formBuilder: FormBuilder, private authService: AuthService, private redirect: RedirectService) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            isAdmin: [false],
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        console.log('We are about to submit the form with details: ', this.loginForm.value);
        const { username, password, isAdmin } = this.loginForm.value;
        this.authService.login({ username, password, isAdmin }).subscribe(
            async (resp: any) => {
                Swal.fire({
                    text: `${resp.message}`,
                    icon: 'success',
                    timer: 2000,
                }).then((res: SweetAlertResult) => {
                    /**
                     * TODO: Get the role of the user from the token and redirect accordingly
                     */
                    this.authService.setToken(resp.token).then((res) => {
                        console.log('after login promise', res);
                        this.redirect.to(this.authService.isAdmin ? 'admin' : 'user');
                    });
                });
            },
            (err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    titleText: err.error.message,
                });
            },
        );
    }

    get username() {
        return this.loginForm.get('username');
    }

    get password() {
        return this.loginForm.get('password');
    }
}
