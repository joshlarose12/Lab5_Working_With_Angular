import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  reviewForm: FormGroup;
  error: String;
  title: String;
  
//build form group
  constructor(private _http: HttpService,
    private fb: FormBuilder,
    private auth: AuthService) {
    this.reviewForm = this.fb.group({
      review: [''],
      rating: ['']
    })
  }

  ngOnInit() {
    this.title = this.auth.getTitle();
  }
  //add a review
  addReview() {
    //post call to add review
    this._http.postReview(this.reviewForm.value.review,this.reviewForm.value.rating).subscribe((res: any) => {
      console.log("created song")
      this.error = res.error;
      },error=>{
        //display error
        this.error = error.error;
        console.log(error);
      });
  }


}
