import {Directive, ElementRef, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[add-touch-capability-class]',
})
export class AddTouchCapabilityClass implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer) {
  }

  ngOnInit(): void {
    const CLASS_NAME_PREFIX = this.isTouchDevice() ? '' : 'no-';
    this.renderer.setElementClass(this.el.nativeElement, CLASS_NAME_PREFIX +
      'touch', true);
  }

  private isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }
}

