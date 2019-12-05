import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
//admin functions
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  policy:string;
  error:string;
  
  constructor(private _http: HttpService,private router:Router) { }

  
  ngOnInit() {
  }
  setAdmin(email){
    
  }
  deactivate(email){

  }
  setHidden(title){

  }
  createPolicy(){
    this._http.postPolicy(this.policy).subscribe((res: any) => {
      this.router.navigate(['']);
    }, error => {
      this.error = error.error,
        console.log(error.error)
    });
  }

}
