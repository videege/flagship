import { Component, OnInit } from '@angular/core';
import {AuthProvider} from 'ngx-auth-firebaseui';

@Component({
  selector: 'flagship-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public allowedProviders = [
    AuthProvider.ANONYMOUS,
    AuthProvider.EmailAndPassword,
    AuthProvider.Google
  ];

  constructor() { }

  ngOnInit() {
  }

  public onSuccess() {
    
  }

  public onError() {

  }

  public goToRegistration() {

  }

}
