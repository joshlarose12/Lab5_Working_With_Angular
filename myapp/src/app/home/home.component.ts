import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  admin: Boolean;
  loggedIn: Boolean;
  songs: Object;
  display: String;
  clicked: Boolean = false;

  constructor(private _http: HttpService,
    private auth: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit() {
//display all songs gy getting from database
    this._http.getSongs().subscribe(data => {
      this.songs = data;
      console.log(this.songs);
    })
    //set bools to display a log in
    this.admin = this.auth.getSiteAdmin();
    this.loggedIn = this.auth.getLoggedIn();
    console.log(this.auth.getLoggedIn());
  }
  //navigate to add song route
  addSong() {
    this.router.navigate(['addsong']);
  }
  //navigate to admin route
  adminSite(){
    this.router.navigate(['admin']);
  }
  //display more when clicked
  displayMore(title) {
    if (this.clicked == false) {

      this.display = title;
      this.clicked = true;
    }
    else {
      this.clicked = false;
      if (title == this.display)
        this.display = "";
      else
        this.display = title;
    }
  }
  //logs out user and brings tehm to login page
  logout(){
    this.auth.setLoggedIn(false);
    this.auth.setSiteAdmin(false);
    this.router.navigate(['login']);
    localStorage.clear();
  }
}
