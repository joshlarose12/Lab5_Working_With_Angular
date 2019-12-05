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
  //log in function
  loginUser() {
    //post call
    this._http.postLogin(this.signupForm.value).subscribe(
      (res: any) => {
        console.log(res.admin);
        //checks if admin
        if (res.admin) {
          if (res.admin == true) {
            this.router.navigate(['admin']);
          }
        }
        //successful login
        else {
          this.router.navigate(['']);
          localStorage.setItem("access_token", res.token);
          this.loggedin = 'Logged in!';
          this.authService.setLoggedIn(true);
          this.authService.setUsername(this.signupForm.value.email);
          console.log(this.authService.getLoggedIn());
        }
      }, error => { this.loggedin = error.error, console.log(error.error) }
    );
  }

}
