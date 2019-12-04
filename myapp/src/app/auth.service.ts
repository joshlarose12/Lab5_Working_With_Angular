import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn:Boolean = false;
  private songId:string = "";
  private siteAdmin:Boolean = false;

  constructor() { }

  getLoggedIn(){
    return this.loggedIn;
  }
  setLoggedIn(value:Boolean){
    this.loggedIn = value;
  }

  getSongId(){
    return this.songId;
  }
  setSongId(value:string){
    this.songId = value;
  }

  getSiteAdmin(){
    return this.siteAdmin;
  }
  setSiteAdmin(value:Boolean){
    this.siteAdmin = value;
  }
}
