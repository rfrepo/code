import AppStatusService from '../../../services/app-status.service';
import {Directive, ElementRef, Input, Renderer} from '@angular/core';

@Directive({
  selector: '[toggle-class-on-timeout]',
})
export class ToggleClassOnTimeoutDirective {
  @Input('toggle-class-on-timeout')
  config: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private appStatusService: AppStatusService) {
  }

  ngOnInit() {
    let isInitialisedObserver =
      this.appStatusService.isInitialised.subscribe(() => {
        setTimeout(() => {
          this.toggleClass();
          isInitialisedObserver.unsubscribe();
        }, this.config.delay);
      });
  }

  private toggleClass(): void {
    const {classname, isadd} = this.config;

    const element = this.el.nativeElement;

    if (!element.classList) {
      this.toggleClassUsingAttributes(element);
    } else {
      this.renderer.setElementClass(element, classname, isadd);
    }
  }

  private toggleClassUsingAttributes(element) {
    const {classname, isadd} = this.config;

    const existingClass = element.getAttribute('class');

    const newClass = isadd
      ? `${existingClass} ${classname}`
      : existingClass.replace(classname);

    element.setAttribute('class', newClass);
  }
}
