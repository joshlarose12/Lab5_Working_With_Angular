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

    this._http.getSongs().subscribe(data => {
      this.songs = data;
      console.log(this.songs);
    })
    this.admin = this.auth.getSiteAdmin();
    this.loggedIn = this.auth.getLoggedIn();
    console.log(this.auth.getLoggedIn());
  }

  addSong() {
    this.router.navigate(['addsong']);
  }

  adminSite(){
    this.router.navigate(['admin']);
  }

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
}
