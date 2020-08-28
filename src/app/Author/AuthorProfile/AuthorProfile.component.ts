import { Component, OnInit } from '@angular/core';

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
