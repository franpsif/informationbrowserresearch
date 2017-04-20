import { RequestOptionsArgs } from '@angular/http';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, NavigationCancel, Router } from "@angular/router";

@Component({
  selector: 'u4-ib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  //private url: string = 'https://u4ids-sandbox.u4pp.com/identity/connect/authorize?client_id=information-browser&scope=openid&nonce=fakenonce&acr_values=tenant%3apraetorians&response_type=id_token%20token&redirect_uri=http://localhost:4200';
  private id_token: string;
  private access_token: string;
  private token_type: string;
  private expires_in: string;
  private scope: string;
  private state: string;
  private session_state: string;

  constructor (private http: Http, private authService: AuthService, private route: ActivatedRoute, private router: Router) {  }

  ngOnInit() { 
      this.route.fragment.map(fragment => {
        if(fragment !== '' && fragment !== null){
            this.saveDataAndRedirectToHome(fragment);
          }
      });

      this.route.fragment.subscribe(
        (fragment: string) => {
          if(fragment !== '' && fragment !== null){
            this.saveDataAndRedirectToHome(fragment);
          }          
        }
      );
  }

  saveDataAndRedirectToHome(fragment: string){
    this.saveData(fragment);
    this.router.navigateByUrl('/', {preserveQueryParams: false});
  }

  saveData(fragment: string) {
    let fragmentSplitted = fragment.split('&');

    this.id_token = fragmentSplitted[0].split('=')[1];
    this.access_token = fragmentSplitted[1].split('=')[1];
    this.token_type = fragmentSplitted[2].split('=')[1];
    this.expires_in = fragmentSplitted[3].split('=')[1];
    this.scope = fragmentSplitted[4].split('=')[1];
    this.state = fragmentSplitted[5].split('=')[1];
    this.session_state = fragmentSplitted[6].split('=')[1];
  }

  getUserInfo(){
    let customHeaders = new Headers();
    customHeaders.append('Content-Type', 'application/json')
    customHeaders.append('Authorization','Bearer ' + this.access_token);
    this.http.get('https://u4ids-sandbox.u4pp.com/identity/userinfo', {headers: customHeaders}).subscribe(
      response => {
      console.log(response);
    });
  }

  clearState() {
    this.authService.clearState();
  }

  getUser() {
    this.authService.getUser();
  }

  removeUser() {
    this.authService.removeUser();
  }

  startSigninMainWindow() {
    this.authService.startSigninMainWindow();
  }

  endSigninMainWindow() {
    this.authService.endSigninMainWindow();
  }

  startSignoutMainWindow() {
    this.authService.startSignoutMainWindow();
  }

  endSignoutMainWindow() {
    this.authService.endSigninMainWindow();
  }
}