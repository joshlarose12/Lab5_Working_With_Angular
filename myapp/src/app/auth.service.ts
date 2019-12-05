import { Injectable } from '@angular/core';

//service for components to communicate

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //various different variables that multiple components will need access to
  private loggedIn:Boolean = false;
  private songId:string = "";
  private siteAdmin:Boolean = false;
  private title:String = "";
  private username:String = "";

  constructor() { }

  //standard get and set functions for variables
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

  getTitle(){
    return this.title;
  }
  setTitle(title){
    this.title = title;
  }
  getUsername(){
    return this.username;
  }
  setUsername(username){
    this.username = username;
  }
}
