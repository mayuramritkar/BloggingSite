import { Component, OnInit, Input, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Comments } from 'src/models/comment';
import { CommentService } from 'src/services/comment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BloggerService } from 'src/services/Blogger.service';

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
  blogData;

  constructor(
    private datePipe: DatePipe,
    private commentService: CommentService,
    private blogService: BloggerService,
    public dialogRef: MatDialogRef<AddCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.blogId = data.blogId;
    this.blogData = data.blogData;
    this.isAdmin = data.isAdmin;
  }

  ngOnInit() {
  }

  onCommentPost(commentForm) {
    this.comments.commentDate = this.datePipe.transform(Date.now(), 'MM-dd-yyyy HH:mm:ss');
    this.comments.blogId = this.blogId;
    this.comments.commentedBy = this.appUser.displayName;
    this.comments.email = this.appUser.email;
    this.commentService.saveComment(this.comments).then(() => {
      if (this.blogData) {
        if (!this.blogData.commentCount) {
          this.blogData.commentCount = 0;
        }
        this.blogData.commentCount++;
      }
      this.blogService.updatePost(this.blogId, this.blogData);
      commentForm.resetForm();
    });
    this.dialogRef.close();
  }

}
