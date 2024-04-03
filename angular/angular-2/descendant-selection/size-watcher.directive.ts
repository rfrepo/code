import {
    Directive, ElementRef, AfterViewInit, ViewContainerRef, ViewRef, QueryList,
    ViewChildren, ContentChild, ContentChildren, OnChanges, Output, HostListener
} from '@angular/core';
import { SizeObserverDirective } from "./size-observer.directive";
import { BaseSize } from "./BaseSize";

@Directive({
    selector: '[size-watcher]'
})

export class SizeWatcherDirective implements AfterViewInit, OnChanges {

    // @ViewChildren(SizeObserverDirective) trackerList: QueryList<SizeObserverDirective>;
    @ContentChildren(BaseSize) kids: QueryList<BaseSize>;

    constructor(hostElement: ElementRef, viewContainerRef: ViewContainerRef) {
        //viewContainerRef._element.parentView.context
        //window.viewContainerRef = viewContainerRef;
    }

    ngAfterViewInit() {
        // available here
        console.dir(this.kids);
    }


    @HostListener('window:resize')
    update() {

        this.kids.forEach((observer: BaseSize) => {
            observer.update({ width: Math.random() * 100, height: Math.random() * 100 })
        })

        //console.log('thats just the way it is!!!');
    }

    ngOnChanges() {
        //console.log('thats just the way it is!!!');
    }

    /*  @HostListener('window:resize')
     updateHeightAndWidth() {

     const { domReference, _window } : any = this;
     let { paddingLeft, paddingRight, width }: any = _window.getComputedStyle(domReference.parentElement, null);
     const combinedPadding = parseInt(paddingLeft) + parseInt(paddingRight);

     width = parseInt(width) - combinedPadding;
     const height = Math.floor(width / (16 / 9));

     this.dimensions = { width, height };
     }*/

}
