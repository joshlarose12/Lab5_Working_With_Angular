import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keyword: string;
  songs: Object;
  displaySearch: Boolean;
  reviews: Object;
  displayReviews: Boolean;
  loggedIn: Boolean;

  constructor(private _http: HttpService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.displaySearch = true;
    this.displayReviews = false;
    this.loggedIn = this.auth.getLoggedIn();
  }

  ngOnInit() {
  }
  back() {
    this.displaySearch = true;
    this.displayReviews = false;
  }
  search() {
    console.log(this.keyword)
    this._http.getSearch(this.keyword).subscribe(data => {
      this.displaySearch = true;
      this.songs = data;
      console.log(data);
    });
  }
  //displays reviews for selected song
  getReviews(title) {
    this.displayReviews = true;
    this._http.getReviews(title).subscribe(data => {
      this.reviews = data;
      this.displaySearch = false;
      this.displayReviews = true;

      console.log(data);
    });
  }
  //directs user to add review page

  addReview(title) {
    this.auth.setTitle(title);
    this.router.navigate(['addreview']);
  }


}
