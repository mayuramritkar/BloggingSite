import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ProfileCard',
  templateUrl: './ProfileCard.component.html',
  styleUrls: ['./ProfileCard.component.scss']
})
export class ProfileCardComponent implements OnInit {

  appUser: any;
  // action = false;
  appUserId: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    if (this.router.url.endsWith('/author')) {
      // this.action = true;
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    } else if (this.router.url.includes('/author/view/')) {
      this.viewAuthorProfile();
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
}
