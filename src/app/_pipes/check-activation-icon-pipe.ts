import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkAvtivationIconPipe',
})
export class CheckActivationIconPipe implements PipeTransform {
  transform(value: boolean): string {
    var htmlElement: HTMLElement;
    htmlElement = document.createElement('i');
    htmlElement.innerText = '';
    if (value) {
      htmlElement.setAttribute('class', 'fa fa-check');
    } else {
      htmlElement.setAttribute('class', 'fa fa-close');
    }
    return htmlElement.outerHTML;
  }
}
