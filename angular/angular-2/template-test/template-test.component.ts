import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-template-test',
    templateUrl: 'template-test.component.html',
    styleUrls: ['template-test.component.css']
})
export class TemplateTestComponent implements OnInit {

    templateId: string = '';

    constructor() {
    }

    ngOnInit() {
    }

    handleChangeInTemplate(templateId: string) {
        this.templateId = templateId;
    }
}
