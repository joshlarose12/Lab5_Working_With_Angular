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
  displaySearch:Boolean;
  constructor(private _http: HttpService) {

  }

  ngOnInit() {
  }

  search() {
    console.log(this.keyword)
    this._http.getSearch(this.keyword).subscribe(data => {
      this.songs = data;
      this.displaySearch = true;
    });
  }
  seeReviews(title){
    this.displaySearch = false;
  }

}
