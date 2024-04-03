import {
    Component, QueryList, ViewChildren, TemplateRef, ViewContainerRef, OnChanges, SimpleChanges, Input
} from '@angular/core';
import { TrackerDirective } from "../tracker/tracker.directive";

@Component({
    selector: 'app-templatee',
    templateUrl: './templatee.component.html',
    styleUrls: ['./templatee.component.css'],
})
export class TemplateeComponent implements OnChanges {
    @Input()
    templateId: string;


    @ViewChildren(TrackerDirective)
    trackerList: QueryList<TrackerDirective>;

    constructor(private viewContainer: ViewContainerRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {

        const { templateId }: any = changes;

        if (templateId.currentValue) {
            this.viewContainer.clear();
            this.viewContainer.createEmbeddedView(this.findElementById(templateId.currentValue))
        }
    }

    findElementById(id: any): TemplateRef<any> {
        let template: TemplateRef<any>;

        this.trackerList.map((tracker: TrackerDirective) => {
            if (tracker.getId() === id) {
                template = tracker.getTemplate();
            }
        });

        return template;
    }
}