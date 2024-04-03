import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList,
  Renderer,
} from '@angular/core';
import {ABSOLUTE, HEIGHT, POSITION, PX} from '../../../support/constants';

@Directive({
  selector: '[app-match-content-height]',
})
export class MatchContentHeightDirective implements AfterContentInit {

  readonly CARD_FRONT_ELEMENT_SELECTOR = '.front';
  readonly CARD_BACK_ELEMENT_SELECTOR = '.back';
  @ContentChildren('flip_card_container')
  flipCardContainers: QueryList<any>;
  private frontElements: Array<any> = [];
  private backElements: Array<any> = [];

  constructor(private renderer: Renderer) {
  }

  public ngAfterContentInit(): void {
    let tallestContainerHeight = this.getTallestContainerHeight();

    this.setAllContainerAndChildHeights(tallestContainerHeight);
  }

  private getTallestContainerHeight(): number {
    let tallestContainerHeight = 0;

    this.flipCardContainers.forEach((container) => {
      const tallestHeight = this.getTallestChild(container);
      tallestContainerHeight =
        tallestHeight >
        tallestContainerHeight
          ? tallestHeight
          : tallestContainerHeight;
    });

    return tallestContainerHeight;
  }

  private getTallestChild(container: ElementRef): number {
    let tallestFrontCard = this.getTallestFrontCard(container);

    let tallestBackCard = this.getTallestBackCard(container);

    return Math.max(tallestFrontCard, tallestBackCard);
  }

  private getTallestFrontCard(container: ElementRef): number {
    let tallestHeight = 0;

    const cardFrontElements = this.getCardFrontElements(container);

    cardFrontElements.forEach((nativeElement) => {
      let elementHeight = this.getHeightFromElement(nativeElement);

      tallestHeight =
        elementHeight > tallestHeight ? elementHeight : tallestHeight;
    });

    return tallestHeight;
  }

  private getCardFrontElements(container: ElementRef): any {
    const elements = Array.from(
      container.nativeElement.querySelectorAll(
        this.CARD_FRONT_ELEMENT_SELECTOR,
      ),
    );

    this.frontElements = [...this.frontElements, ...elements];

    return elements;
  }

  private getTallestBackCard(container: ElementRef): number {
    let tallestHeight = 0;

    const cardBackElements = this.getCardBackElements(container);

    cardBackElements.forEach((nativeElement) => {
      let elementHeight = this.getHeightFromElement(nativeElement);

      tallestHeight =
        elementHeight > tallestHeight ? elementHeight : tallestHeight;

      this.renderer.setElementStyle(nativeElement, POSITION, ABSOLUTE);
    });

    return tallestHeight;
  }

  private getCardBackElements(container: ElementRef): any {
    const elements = Array.from(
      container.nativeElement.querySelectorAll(this.CARD_BACK_ELEMENT_SELECTOR),
    );

    this.backElements = [...this.backElements, ...elements];

    return elements;
  }

  private getHeightFromElement(nativeElement: any) {
    const {clientHeight, scrollHeight} = nativeElement;
    return Math.max(clientHeight, scrollHeight);
  }

  private setAllContainerAndChildHeights(height: number): void {
    this.flipCardContainers.forEach((element) => {
      this.setElementsHeight(element.nativeElement, height);
    });

    this.frontElements.forEach((element) => {
      this.setElementsHeight(element, height);
    });

    this.backElements.forEach((element) => {
      this.setElementsHeight(element, height);
    });
  }

  private setElementsHeight(element: any, height: number) {
    this.renderer.setElementStyle(element, HEIGHT, `${height + PX}`);
  }
}
