import { Directive, Input, HostListener, ElementRef } from '@angular/core';
@Directive({
  selector: '[appResize]'
})
export class ResizeDirective {
  @Input('leftResize') leftElement: HTMLElement;
  @Input('rightResize') rightElement: HTMLElement;
  grabber: boolean = false;
  width: number;
  constructor(private el: ElementRef<HTMLElement>) { }
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.width = event.target.outerWidth;
  }
  @HostListener('mousedown') onMouseDown() {
    this.grabber = true;
    this.el.nativeElement.classList.add('side-panel');
    document.body.style.cursor = 'e-resize';
  }

  @HostListener('window:mouseup') onMouseUp() {
    this.grabber = false;
    this.el.nativeElement.classList.remove('side-panel');
    document.body.style.cursor = 'default';
  }

  @HostListener('window:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.grabber) {
      event.preventDefault();
      if (event.movementX > 0) {
        this.rightElement.style.flex = `0 5 ${(this.width || window.screen.availWidth) - event.clientX + 100}px`;
        this.leftElement.style.flex = `1 5 ${event.clientX - 16}px`;
      } else {
        this.leftElement.style.flex = `0 5 ${event.clientX - 16}px`;
        this.rightElement.style.flex = `1 5 ${(this.width || window.screen.availWidth) - event.clientX + 100}px`;
      }
    }
  }
}
