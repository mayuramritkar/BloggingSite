import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-AddAuthorInformation',
  templateUrl: './AddAuthorInformation.component.html',
  styleUrls: ['./AddAuthorInformation.component.scss']
})
export class AddAuthorInformationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddAuthorInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // console.log('Data open', data);
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
