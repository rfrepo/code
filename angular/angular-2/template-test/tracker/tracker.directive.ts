import { Directive, TemplateRef, Input } from '@angular/core';

@Directive({
    selector: '[appTracker]'
})
export class TrackerDirective {
    @Input()
    appTracker: string;

    constructor(private templateRef: TemplateRef<any>) {
        console.log('made!!');
    }

    getTemplate() {
        return this.templateRef;
    }

    getId() {
        return this.appTracker;
    }
}
