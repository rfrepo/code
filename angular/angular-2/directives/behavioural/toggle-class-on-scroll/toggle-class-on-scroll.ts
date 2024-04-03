/**
 * Created by keithchingandu on 24/05/2017.
 */
import {Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';
import WindowScrollService from '../../../services/window-scroll.service';

@Directive({
  selector: '[toggle-class-on-scroll]',
})
export class ToggleClassOnScrollDirective implements OnInit {
  @Input('toggle-class-on-scroll')
  config: any;

  constructor(
    private renderer: Renderer,
    private element: ElementRef,
    private windowScrollService: WindowScrollService) {
    this.windowScrollService.scroll(25).subscribe((event) => this.onScroll());
  }

  public ngOnInit(): void {
    this.onScroll();
  }

  private onScroll() {
    const currentScrollPosition = document.documentElement.scrollTop ||
      document.body.scrollTop;

    const {scrollvalue, classname} = this.config;

    const isAdd = Boolean(currentScrollPosition > scrollvalue);

    this.renderer.setElementClass(this.element.nativeElement, classname, isAdd);
  }
}
