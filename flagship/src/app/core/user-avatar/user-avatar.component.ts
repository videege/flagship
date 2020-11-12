import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

// This class is a modification of the ngx-auth avatar component
// https://ngx-auth-firebaseui.firebaseapp.com/doc/components/NgxAuthFirebaseuiAvatarComponent.html#source

@Component({
  selector: 'flagship-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnInit {
  user: User;
  user$: Observable<User | null>;
  displayNameInitials: string;

  constructor(public afa: AngularFireAuth,
              public dialog: MatDialog,
              public router: Router) {
  }

  ngOnInit() {
    this.user$ = this.afa.user;
    this.user$.subscribe((user: User) => {
      this.user = user;
      this.displayNameInitials = user ? this.getDisplayNameInitials(user.displayName) : null;
    });
  }

  getDisplayNameInitials(displayName: string): string {
    if (!displayName) {
      return null;
    }
    const initialsRegExp: RegExpMatchArray = displayName.match(/\b\w/g) || [];
    const initials = ((initialsRegExp.shift() || '') + (initialsRegExp.pop() || '')).toUpperCase();
    return initials;
  }

  async signOut() {
    try {
      await this.afa.signOut();
      this.router.navigateByUrl('/login');
    } catch (e) {
      // An error happened.
      console.error('An error happened while signing out!', e);
    }
  }
}
