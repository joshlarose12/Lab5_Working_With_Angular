import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  policys: Object;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getPolicy().subscribe((data:any)=>{
      console.log(data)
      this.policys = data;
      console.log(this.policys);
    })
  }

}
