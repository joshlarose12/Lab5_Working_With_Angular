import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData } from './templates/loginData';
import { User } from './templates/user';
import { Song } from './templates/song';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private postLoginUrl: string = 'http://localhost:3000/api/open/login';
  private postCreateUserURL: string = 'http://localhost:3000/api/open/register';
  private getSongsURL: string = 'http://localhost:3000/api/open/songs';
  private postSongsURL: string = 'http://localhost:3000/api/open/songs/create';



  constructor(private http: HttpClient) { }

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
    if (localStorage.getItem("access_token")){
      let headers = new HttpHeaders({
        'auth-token':localStorage.getItem("access_token")
      })
      return this.http.post(this.postSongsURL, song, {headers})
    }
  }
}
