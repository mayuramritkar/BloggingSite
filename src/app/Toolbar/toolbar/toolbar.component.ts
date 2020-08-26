// import * as firebase from 'firebase/app';
// import * as firebaseui from 'firebaseui';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { AddPostComponent } from 'src/app/AddingPost/AddPost/AddPost.component';
import { AuthService } from '../../../services/Auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  user: any;

  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private fireAuth: AngularFireAuth,
    private router: Router
  ) {

    // Initialize the FirebaseUI Widget using Firebase.
    // const ui = new firebaseui.auth.AuthUI(firebase.auth());
    // const uiConfig = {
    //   callbacks: {
    //     signInSuccessWithAuthResult(authResult, redirectUrl) {
    //       // User successfully signed in.
    //       // Return type determines whether we continue the redirect automatically
    //       // or whether we leave that to developer to handle.
    //       return true;
    //     },
    //     uiShown() {
    //       // The widget is rendered.
    //       // Hide the loader.
    //       document.getElementById('loader').style.display = 'none';
    //     }
    //   },
    //   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    //   signInFlow: 'popup',
    //   signInSuccessUrl: '/',
    //   signInOptions: [
    //     // Leave the lines as is for the providers you want to offer your users.
    //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //     // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //     // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //     // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //     // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //     // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    //   ],
    //   // Terms of service url.
    //   tosUrl: 'www.google.com',
    //   // Privacy policy url.
    //   privacyPolicyUrl: 'www.google.com'
    // };

    // ui.start('#firebaseui-auth-container', uiConfig);

    this.fireAuth.user.subscribe(user => {
      if (user !== null && user !== undefined) {
        this.user = user.providerData[0];
        localStorage.setItem('token', JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'));
        // console.log('User', user);
      }
    });
  }

  ngOnInit() {

  }

  Login() {
    this.auth.login();
    // firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  Logout() {
    this.auth.logout();
    // firebase.auth().signOut().then(() => {
    //   localStorage.clear();
    this.user = undefined;
    //   this.router.navigate(['/']);
    // });

  }
}
