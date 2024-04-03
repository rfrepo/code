/**
 * Created by keithchingandu on 24/05/2017.
 */
import {Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[toggle-class-on-event]',
})
export class ToggleClassOnEventDirective implements OnInit {
  @Input('toggle-class-on-event')
  config: any;

  constructor(
    private element: ElementRef,
    private renderer: Renderer) {
  }

  public ngOnInit(): void {
    const {eventname, classname, isonce, isadd, istoggle} = this.config;
    const removeListener = this.renderer.listen(this.element.nativeElement,
      eventname,
      () => {

        let add = istoggle
          ? !this.element.nativeElement.classList.contains(classname)
          : isadd;

        this.renderer.setElementClass(this.element.nativeElement,
          classname,
          add);

        if (isonce) {
          removeListener();
        }
      });
  }
}
