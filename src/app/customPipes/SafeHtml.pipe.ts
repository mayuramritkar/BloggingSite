// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'SafeHtml'
// })
// export class SafeHtmlPipe implements PipeTransform {

//   transform(value: any, args?: any): any {
//     return null;
//   }

// }

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the SafeHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}