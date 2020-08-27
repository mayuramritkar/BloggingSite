import { Component, OnInit } from '@angular/core';
import { BloggerService } from 'src/services/Blogger.service';
import { AuthService } from 'src/services/Auth.service';

@Component({
  selector: 'app-AuthorProfile',
  templateUrl: './AuthorProfile.component.html',
  styleUrls: ['./AuthorProfile.component.scss']
})
export class AuthorProfileComponent implements OnInit {

  constructor(
  ) {
    console.log('In Author Profile CTOR');
  }

  ngOnInit() {
  }
}
