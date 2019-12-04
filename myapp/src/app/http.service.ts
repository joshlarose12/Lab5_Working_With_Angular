import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './templates/user';
import { Song } from './templates/song';
import { Review } from './templates/review';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private postLoginUrl: string = 'http://localhost:3000/api/open/login';
  private postCreateUserURL: string = 'http://localhost:3000/api/open/register';
  private getSongsURL: string = 'http://localhost:3000/api/open/songs';
  private postSongsURL: string = 'http://localhost:3000/api/secure/songs/create';
  private postReviewURL: string = 'http://localhost:3000/api/secure/review/add';
  private getReviewURL: string = 'http://localhost:3000/api/open/review?song=';
  private getSearchURL: string = 'http://localhost:3000/api/open/search?search=';
  private putUserURL: string = 'http://localhost:3000/api/secure/user'

  constructor(private http: HttpClient, private authService: AuthService) { }

  postLogin(user: User) {
    return this.http.post(this.postLoginUrl, user);
  }

  postCreateUser(user: User) {
    return this.http.post(this.postCreateUserURL, user);
  }

  getSongs() {
    return this.http.get(this.getSongsURL);
  }

  postSong(song: Song) {
    if (this.authService.getLoggedIn()) {
      let headers = new HttpHeaders({
        'auth-token': localStorage.getItem("access_token")
      })
      return this.http.post(this.postSongsURL, song, { headers })
    }
  }
  postReview(review: Review){
    if (this.authService.getLoggedIn()) {
      let headers = new HttpHeaders({
        'auth-token': localStorage.getItem("access_token")
      });
      return this.http.post(this.postReviewURL, review, { headers })
    }
  }
  getReviews(song:String){
    console.log(song);
    return this.http.get(this.getReviewURL+song);
  }
  putUser(email:String){
    if(this.authService.getSiteAdmin()){
      let headers = new HttpHeaders({
        'auth-token': localStorage.getItem("access_token")
      });
      return this.http.put(this.putUserURL,{email})
    }
  }
  getSearch(search:string){
    return this.http.get(this.getSearchURL+search);
  }
}
