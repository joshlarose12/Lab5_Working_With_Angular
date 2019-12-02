import { Component, OnInit } from '@angular/core';
import { LoginData } from '../templates/loginData';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private _http: HttpService,
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  ngOnInit() {
  }


  createUser() {
    this._http.postCreateUser(this.signupForm.value).subscribe();
  };
}
