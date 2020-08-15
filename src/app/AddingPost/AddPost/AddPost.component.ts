import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-AddPost',
  templateUrl: './AddPost.component.html',
  styleUrls: ['./AddPost.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>
  ) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
