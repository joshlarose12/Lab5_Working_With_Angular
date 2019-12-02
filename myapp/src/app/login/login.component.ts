import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { LoginData } from '../templates/loginData';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedin: string = "";
  token: String;
  signupForm: FormGroup;

  constructor(
    private _http: HttpService,
    private router: Router,
    private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {
  }

  loginUser() {
    this._http.postLogin(this.signupForm.value).subscribe(
      (res: any) => {
        if (!res.error) {
          this.router.navigate(['']);
          localStorage.setItem("access_token", res.token);
          this.loggedin = "Logged in!";
        }
        this.loggedin = res.error;
      },
    );

  }

}
