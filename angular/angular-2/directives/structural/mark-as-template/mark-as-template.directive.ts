import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[app-mark-as-template]',
})
export class MarkAsTemplateDirective {
  @Input('app-mark-as-template')
  templateId: string;

  constructor(private templateRef: TemplateRef<any>) {
  }

  getTemplate() {
    return this.templateRef;
  }

  getId() {
    return this.templateId;
  }
}
