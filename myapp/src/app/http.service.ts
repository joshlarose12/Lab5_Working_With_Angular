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
  //all routes to back end
  private postLoginUrl: string = 'http://localhost:3000/api/open/login';
  private postCreateUserURL: string = 'http://localhost:3000/api/open/register';
  private getSongsURL: string = 'http://localhost:3000/api/open/songs';
  private postSongsURL: string = 'http://localhost:3000/api/secure/songs/create';
  private postReviewURL: string = 'http://localhost:3000/api/secure/review/add';
  private getReviewURL: string = 'http://localhost:3000/api/open/review?song=';
  private getSearchURL: string = 'http://localhost:3000/api/open/search?search=';
  private putUserURL: string = 'http://localhost:3000/api/secure/user'

  constructor(private http: HttpClient, private authService: AuthService) { }


  //all calls
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
    //checks token to verify logged in
    if (this.authService.getLoggedIn()) {
      let headers = new HttpHeaders({
        'auth-token': localStorage.getItem("access_token")
      })
      return this.http.post(this.postSongsURL, song, { headers })
    }
  }
  postReview(myReview: string, myRating: number) {
    console.log(this.authService.getUsername())
    //checks token to verify logged in

    if (this.authService.getLoggedIn()) {
      let headers = new HttpHeaders({
        'auth-token': localStorage.getItem("access_token")
      });
      return this.http.post(this.postReviewURL, { review: myReview, rating: myRating, username: this.authService.getUsername(), song: this.authService.getTitle() }, { headers })
    }
  }
  getReviews(song: String) {
    console.log(song);
    return this.http.get(this.getReviewURL + song);
  }
  putUser(email: String) {
    //checks token to verify logged in

    if (this.authService.getSiteAdmin()) {
      let headers = new HttpHeaders({
        'auth-token': localStorage.getItem("access_token")
      });
      return this.http.put(this.putUserURL, { email })
    }
  }
  getSearch(search: string) {
    return this.http.get(this.getSearchURL + search);
  }
}
