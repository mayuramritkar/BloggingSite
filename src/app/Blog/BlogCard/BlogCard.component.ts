import { Component, OnInit, Input, SimpleChanges, DoCheck } from '@angular/core';
import { BloggerService } from 'src/services/Blogger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/Auth.service';
import { CommentService } from 'src/services/comment.service';

// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-BlogCard',
  templateUrl: './BlogCard.component.html',
  styleUrls: ['./BlogCard.component.scss']
})
export class BlogCardComponent implements OnInit, DoCheck {

  authorPost = [];
  allPost = [];
  appUser: any = JSON.parse(localStorage.getItem('user'));

  config: any;
  pageSizeOptions = [];

  public dislike = true;

  filterVal = '';
  action = false;

  authorName: any;

  @Input()
  set filterFunction(filter: string) {
    this.filterVal = filter;
  }

  constructor(
    private bloggerService: BloggerService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private commentService: CommentService
  ) {

    this.pageSizeOptions = [2, 4, 6];
    const pageSize = sessionStorage.getItem('pageSize');
    this.config = {
      currentPage: 1,
      itemsPerPage: pageSize ? +pageSize : this.pageSizeOptions[0]
    };
  }

  ngOnInit() {
    this.bloggerService.getAllPosts().subscribe(res => {
      this.allPost = res;
      if (this.appUser !== undefined && this.router.url.endsWith('/author')) {
        this.action = true;
        this.authorPost = res.filter(x => x.author === this.appUser.displayName);
      } else if (this.router.url.includes('/author/view/')) {
        this.viewAuthorProfile(res);
      } else {
        this.authorPost = res;
      }
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges) {
    for (const property in changes) {
      if (property === 'filterFunction') {
        // console.log('Previous: ', changes[property].previousValue);
        // console.log('Current: ', changes[property].currentValue);
        // console.log('firstChange: ', changes[property].firstChange);

        if (changes[property].firstChange === false &&
          this.filterVal !== '' &&
          this.filterVal !== null &&
          this.filterVal !== undefined) {
          this.authorPost = this.allPost.filter(x => x.title.includes(changes[property].currentValue));
        } else {
          this.authorPost = this.allPost;
        }
      }
    }
  }

  delete(id) {
    if (confirm('Are you sure')) {
      this.bloggerService.deletePost(id).then(
        () => {
          this.commentService.deleteAllCommentForBlog(id);
          this.snackBar.open('Blog post deleted successfully', 'Dismiss', { duration: 3000 });
        }
      );
    }
  }

  viewAuthorProfile(res) {
    this.action = false;
    if (this.route.snapshot.params['Name']) {
      this.authorName = this.route.snapshot.paramMap.get('Name');
      // console.log('Author Name', this.authorName, this.appUser);
    }
    this.authorPost = res.filter(x => x.author === this.authorName);
    if (this.appUser && this.appUser.displayName === this.authorName) {
      this.action = true;
    }
  }

  ngDoCheck(): void {
    this.appUser = JSON.parse(localStorage.getItem('user'));
    if (this.appUser && this.appUser.displayName === this.authorName) {
      this.action = true;
    } else if (!this.appUser || this.appUser.displayName !== this.authorName) {
      this.action = false;
    }
    if (this.router.url.endsWith('/author')) {
      if (!this.appUser) {
        this.router.navigate(['/']);
      } else if (this.appUser) {
        this.action = true;
      }
    }
  }

}
