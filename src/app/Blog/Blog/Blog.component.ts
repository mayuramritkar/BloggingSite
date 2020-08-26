import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BloggerService } from 'src/services/Blogger.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-Blog',
  templateUrl: './Blog.component.html',
  styleUrls: ['./Blog.component.scss']
})
export class BlogComponent implements OnInit {

  postData: any;
  postId;

  appUser: any = JSON.parse(localStorage.getItem('user'));

  public dislike = true;

  action = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BloggerService,
    private snackBar: MatSnackBar
  ) {
    if (this.route.snapshot.params['Id']) {
      this.postId = this.route.snapshot.paramMap.get('Id');
    }
  }

  ngOnInit() {
    this.blogService.getPostbyId(this.postId).subscribe(res => {
      this.postData = res;
      console.log('postData', res);

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


}
