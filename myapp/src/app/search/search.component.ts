import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchFrom: FormGroup;
  constructor(private _http: HttpService,
    fb: FormBuilder) {
    this.searchFrom = fb.group({
      search: ['']
    })
  }

  ngOnInit() {
  }

  // search() {
  //   this._http.
  // }

}
