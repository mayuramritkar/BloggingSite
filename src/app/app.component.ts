import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from './AddingPost/AddPost/AddPost.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BloggingSite';

  constructor(public dialog: MatDialog) { }

  AddPostDialogue() {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '250px',
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

  }
}
