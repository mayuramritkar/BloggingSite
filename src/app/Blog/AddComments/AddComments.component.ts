import { Component, OnInit, Input, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Comments } from 'src/models/comment';
import { CommentService } from 'src/services/comment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-AddComments',
  templateUrl: './AddComments.component.html',
  styleUrls: ['./AddComments.component.scss'],
  providers: [DatePipe]
})
export class AddCommentsComponent implements OnInit {

  public comments = new Comments();
  appUser: any = JSON.parse(localStorage.getItem('user'));

  blogId;
  isAdmin;

  constructor(
    private datePipe: DatePipe,
    private commentService: CommentService,
    public dialogRef: MatDialogRef<AddCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.blogId = data.blogId;
    this.isAdmin = data.isAdmin;
  }

  ngOnInit() {
  }

  onCommentPost(commentForm) {
    this.comments.commentDate = this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm:ss');
    this.comments.blogId = this.blogId;
    this.comments.commentedBy = this.appUser.displayName;
    this.comments.email = this.appUser.email;
    this.commentService.saveComment(this.comments).then(
      commentForm.resetForm()
    );
    this.dialogRef.close();
  }

}
