import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  FilterValue: '';

  imageObject = [{
    video: 'https://youtu.be/tYa6OLQHrEc',
    title: 'Youtube example one with title.',
    alt: 'youtube video'
  }, {
    video: 'https://youtu.be/6pxRHBw-k8M',
    alt: 'youtube video'
  }, {
    video: 'https://sanjayv.github.io/ng-image-slider/contents/assets/video/movie2.mp4',
    posterImage: "https://slotuniverses.co.uk/wp-content/uploads/sites/12030/upload_fed1091b34dcf8203c0729c4faa62315.png",
    title: 'Youtube example one with title.'
  }];

  constructor() { }

}
