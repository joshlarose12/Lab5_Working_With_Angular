import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

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
  constructor(private _http: HttpService) {
    this.displaySearch = true;
    this.displayReviews = false;
  }

  ngOnInit() {
  }
  toggle() {
    if (!this.displaySearch) {
      this.displaySearch = true;
      console.log(this.displaySearch)
    } else
      this.displaySearch = false;
  }
  search() {
    console.log(this.keyword)
    this._http.getSearch(this.keyword).subscribe(data => {
      this.displaySearch = true;
      this.songs = data;
      console.log(data);
    });
  }
  getReviews(title) {
    this.displayReviews = true;
    this._http.getReviews(title).subscribe(data => {
      this.reviews = data;
      console.log(data[0]);
    });
  }


}
