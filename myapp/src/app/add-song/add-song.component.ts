import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  songForm: FormGroup;
  error:String;

  constructor(private _http: HttpService,
    private fb: FormBuilder) {
    this.songForm = this.fb.group({
      title: [''],
      artist: [''],
      album: [''],
      year: [''],
      comment: [''],
      genre: ['']
    })
  }

  ngOnInit() {
  }

  addSong() {
    this._http.postSong(this.songForm.value).subscribe((res: any) => {
      console.log("created song")
      this.error = res.error;
      },error=>{
        this.error = error.error;
        console.log(error);
      });
  }
}
