import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'flagship-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  
  currentState = "";

  constructor(private breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth) {
    // this.transitionService.onSuccess({}, (transition) => {
    //   this.currentState = transition.targetState().state().data['title'];
    // });
  }
   
  }
