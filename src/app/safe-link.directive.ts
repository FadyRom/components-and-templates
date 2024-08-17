import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onLeave($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  onLeave(event: MouseEvent) {
    const leavePage = window.confirm(
      'are you sure you want to leave the page?'
    );
    if (leavePage) {
      const address = this.hostElementRef.nativeElement.href;

      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();

      return;
    } else {
      event?.preventDefault();
    }
  }
}
