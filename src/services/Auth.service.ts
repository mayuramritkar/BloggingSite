import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class AuthService {

  appUser$: any;

  constructor(
    public jwtHelper: JwtHelperService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore
  ) {

    // Get the auth state, then fetch the Firestore user document or return null
    this.appUser$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // If the user is logged in, return the user details.
        // console.log('User id', user);
        if (user) {
          return this.db.doc<any>(`appusers/${user.uid}`).valueChanges();
        } else {
          // If the user is NOT logged in, return null.
          return of(null);
        }
      })
    );
  }

  getAuthor(Id): Observable<any> {
    return this.db.doc<any>('appusers/' + Id).valueChanges();
  }

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  async login() {
    // Store the return URL in localstorage, to be used once the user logs in successfully
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || this.router.url;
    localStorage.setItem('returnUrl', returnUrl);

    const credential = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    localStorage.setItem('user', JSON.stringify(credential.user));
    return this.updateUserData(credential.user);
  }

  async logout() {
    firebase.auth().signOut().then(() => {
      localStorage.clear();
      // this.router.navigate(['/']);
    });
  }

  // Save the user data to firestore on login
  private updateUserData(user) {
    const userRef = this.db.doc(`appusers/${user.uid}`);
    const data = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      about: 'Write Something About Yourself...',
      facebookURL: '',
      githubURL: '',
      linkedinURL: '',
      twitterURL: ''
    };
    return userRef.set(data, { merge: true });
  }

  // Update User Data
  public editUserData(id, data) {
    const userRef = this.db.doc(`appusers/${id}`);
    return userRef.set(data, { merge: true });
  }

}
