import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Comments } from 'src/models/comment';
import { CommentService } from 'src/services/comment.service';
import { AuthService } from 'src/services/Auth.service';
import { SnackbarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [DatePipe]
})
export class CommentsComponent implements OnInit, OnDestroy {

  @Input()
  blogId;

  appUser: any = JSON.parse(localStorage.getItem('user'));
  public comments = new Comments();
  commentList: Comments[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private datePipe: DatePipe,
    private commentService: CommentService,
    private authService: AuthService,
    private snackBarService: SnackbarService) { }

  ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    this.getAllComments();
  }

  onCommentPost(commentForm) {
    this.comments.commentDate = this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm:ss');
    this.comments.blogId = this.blogId;
    this.commentService.saveComment(this.comments).then(
      commentForm.resetForm()
    );
  }

  getAllComments() {
    this.commentService.getAllCommentsForBlog(this.blogId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        this.commentList = result;
      });
  }

  deleteComment(commentId) {
    if (confirm('Do you want to delete this comment!!!')) {
      this.commentService.deleteSingleComment(commentId).then(
        () => {
          this.snackBarService.showSnackBar('Comment Deleted successfully');
        }
      );
    }
  }

  login() {
    this.authService.login();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
