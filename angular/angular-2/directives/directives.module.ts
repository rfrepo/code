/* tslint:disable: max-line-length */
import {NgModule} from '@angular/core';
import {MarkAsTemplateDirective} from './structural/mark-as-template/mark-as-template.directive';
import {ToggleClassOnEventDirective} from './behavioural/toggle-class-on-event/toggle-class-on-event';
import {ToggleClassOnTimeoutDirective} from './behavioural/toggle-class-on-timeout/toggle-class-on-timeout';
import {ToggleClassOnScrollDirective} from './behavioural/toggle-class-on-scroll/toggle-class-on-scroll';
import {TrackProgressOnScrollDirective} from './behavioural/track-progress-on-scroll/track-progress-on-scroll';
import {AddTouchCapabilityClass} from './behavioural/add-touch-capability-class/add-touch-capability-class.directive';


@NgModule({
  declarations: getClasses(), exports: getClasses(),
})
export class DirectiveModule {
}

function getClasses(): Array<any> {
  return [
    AddTouchCapabilityClass,
    MarkAsTemplateDirective,
    ToggleClassOnEventDirective,
    ToggleClassOnScrollDirective,
    ToggleClassOnTimeoutDirective,
    TrackProgressOnScrollDirective,
  ];
}
