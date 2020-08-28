import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BloggerService } from 'src/services/Blogger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/Auth.service';

@Component({
  selector: 'app-Blog',
  templateUrl: './Blog.component.html',
  styleUrls: ['./Blog.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit, DoCheck {

  postData: any;
  postId;

  appUser: any = JSON.parse(localStorage.getItem('user'));

  public dislike = true;

  action = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BloggerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    if (this.route.snapshot.params['Id']) {
      this.postId = this.route.snapshot.paramMap.get('Id');
    }
  }

  ngOnInit() {
    this.blogService.getPostbyId(this.postId).subscribe(res => {
      this.postData = res;
      if (this.appUser && this.postData && this.appUser.displayName === this.postData.author) {
        this.action = true;
      }
    });
  }

  delete(id) {
    if (confirm('Are you sure')) {
      this.blogService.deletePost(id).then(
        () => {
          // this.commentService.deleteAllCommentForBlog(postId);
          this.snackBar.open('Blog post deleted successfully', 'Dismiss', { duration: 3000 });
        }
      );
    }
  }

  ngDoCheck(): void {
    this.appUser = JSON.parse(localStorage.getItem('user'));
    if (this.appUser && this.postData && this.appUser.displayName === this.postData.author) {
      this.action = true;
    } else if (!this.appUser || !this.postData || this.appUser.displayName !== this.postData.author) {
      this.action = false;
    }
  }

}
