import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ProfileCard',
  templateUrl: './ProfileCard.component.html',
  styleUrls: ['./ProfileCard.component.scss']
})
export class ProfileCardComponent implements OnInit, DoCheck {


  data = "In Informatics, dummy data is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present. Dummy data can be used as a placeholder for both testing and operational purposes. For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied. In operational use, dummy data may be transmitted for OPSEC purposes. Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects.\
  In Informatics, dummy data is benign information that does not contain any useful data, but serves to reserve space where real data is nominally present.Dummy data can be used as a placeholder for both testing and operational purposes.For testing, dummy data can also be used as stubs or pad to avoid software testing issues by ensuring that all variables and data fields are occupied.In operational use, dummy data may be transmitted for OPSEC purposes.Dummy data must be rigorously evaluated and documented to ensure that it does not cause unintended effects."


  appUser: any;
  action: any = false;
  appUserId: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    if (this.router.url.endsWith('/author')) {
      this.action = false;
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    } else if (this.router.url.includes('/author/view/')) {
      this.action = true;
      this.viewAuthorProfile();
    }
  }

  ngDoCheck() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (this.router.url.endsWith('/author')) {
      if (!user) {
        this.router.navigate(['/']);
      } else if (user) {
        this.action = false;
      }
    } else if (this.router.url.includes('/author/view/')) {
      if (user && this.appUserId === user.uid) {
        this.action = false;
      } else if (!user || this.appUserId !== user.uid) {
        this.action = true;
      }
    }
  }

  ngOnInit() {
  }

  viewAuthorProfile() {
    // this.action = false;
    if (this.route.snapshot.params['Id']) {
      this.appUserId = this.route.snapshot.paramMap.get('Id');
      // console.log('Auth Id', this.appUserId);
      this.auth.getAuthor(this.appUserId).subscribe(data => {
        this.appUser = data;
        // console.log('Auth Data', data);
      });
    }
  }


  followMe() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      this.auth.login();
    } else {
      // Operation of Follw People Write Here
    }
  }

}
