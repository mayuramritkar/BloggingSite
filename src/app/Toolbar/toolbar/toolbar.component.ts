import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPostComponent } from 'src/app/AddingPost/AddPost/AddPost.component';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {

  }

  AddPostDialogue() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddPostComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }
}
