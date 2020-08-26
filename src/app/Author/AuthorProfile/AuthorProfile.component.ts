import { Component, OnInit } from '@angular/core';
import { BloggerService } from 'src/services/Blogger.service';
import { AuthService } from 'src/services/Auth.service';

@Component({
  selector: 'app-AuthorProfile',
  templateUrl: './AuthorProfile.component.html',
  styleUrls: ['./AuthorProfile.component.scss']
})
export class AuthorProfileComponent implements OnInit {

  authorPost = [];
  appUser: any;

  constructor(
    private bloggerService: BloggerService,
    private auth: AuthService,
  ) {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  ngOnInit() {
    // this.bloggerService.getAllPosts().subscribe(res => {
    //   this.authorPost = res.filter(x => x.author === 'Mayur Amritkar');
    //   console.log('All POst', this.authorPost, this.appUser);
    // });
  }
}
