import { Directive, ElementRef, OnInit, HostBinding } from '@angular/core';
import { BaseSize } from "./BaseSize";

@Directive({
    selector: '[size-observer]',
    providers: [{ provide: BaseSize, useExisting: SizeObserverDirective }]
})

export class SizeObserverDirective extends BaseSize {

    @HostBinding('style.height.px')
    height: number;

    @HostBinding('style.width.px')
    width: number;

    update({ width, height }: any) {
        this.width = width;
        this.height = height;
        console.log(this.height, this.width);
    }
}
