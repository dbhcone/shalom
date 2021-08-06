import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RedirectService } from 'src/app/services/redirect.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: null;
  loginForm;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private redirect: RedirectService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      isAdmin: [false]
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('We are about to submit the form with details: ', this.loginForm.value);
    const {username, password, isAdmin } = this.loginForm.value;
    this.authService.login({username, password, isAdmin}).subscribe((res: any)=> {
      if(res.error) {
        this.errorMessage = res.error;
      } else {
        Swal.fire({
          title: 'Success',
          icon: "success"
        }).then((res)=> {
          this.redirect.to(isAdmin ? 'admin' : 'my-dashboard');
        });
      }
    }, (err)=> {
      Swal.fire({
        icon: "error",
        titleText: err.message
      })
    });
  }

  get username () {
    return this.loginForm.get('username');
  }

  get password () {
    return this.loginForm.get('password');
  }
}
