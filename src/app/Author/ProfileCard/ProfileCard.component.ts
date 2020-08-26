import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/Auth.service';

@Component({
  selector: 'app-ProfileCard',
  templateUrl: './ProfileCard.component.html',
  styleUrls: ['./ProfileCard.component.scss']
})
export class ProfileCardComponent implements OnInit {

  appUser: any;

  constructor(
    private auth: AuthService,
  ) {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
  }

}
