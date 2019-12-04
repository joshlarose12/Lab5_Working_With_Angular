import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { LoginData } from '../templates/loginData';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedin: string = '';
  token: string;
  signupForm: FormGroup;

  constructor(
    private _http: HttpService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) {
    this.signupForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
  }

  loginUser() {
    this._http.postLogin(this.signupForm.value).subscribe(
      (res: any) => {
        console.log(res.admin);
        if (res.admin) {
          if (res.admin == true) {
            this.router.navigate(['admin']);
          }
        }
        else {
          this.router.navigate(['']);
          localStorage.setItem("access_token", res.token);
          this.loggedin = 'Logged in!';
          this.authService.setLoggedIn(true);
          console.log(this.authService.getLoggedIn());
        }
      }, error => { this.loggedin = error.error, console.log(error.error) }
    );
  }

}
