import { Component, OnInit } from '@angular/core';
import {AuthProvider} from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'flagship-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public allowedProviders = [
    AuthProvider.ANONYMOUS,
    AuthProvider.EmailAndPassword,
    AuthProvider.Google
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public onSuccess() {
    this.router.navigateByUrl('/fleets');
  }

  public onError() {

  }

  public goToRegistration() {

  }

}
