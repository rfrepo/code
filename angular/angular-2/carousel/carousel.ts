import {CarouselConfiguration} from './carousel-configuration';

export class Carousel {
  private currentPositionIndex = 0;

  private totalPositions: number = 0;

  private callbacks: Array<Function> = [];

  private carouselContentElement: any;

  private positions: Array<number> = [];

  private configuration: CarouselConfiguration;

  constructor(configuration: CarouselConfiguration) {
    this.configuration = configuration;
    this.carouselContentElement = configuration.getViewRef();
    this.addSubscribers();
  }

  public onChange(callback: Function): void {
    if (this.callbacks.indexOf(callback) === -1) {
      this.callbacks.push(callback);
    }
  }

  public getNumberOfPositions(): number {
    return Math.floor((this.getTotalItems() - this.getPageSize()) /
      this.getPageSize());
  }

  public next(): void {
    if ((this.currentPositionIndex + 1) !== this.positions.length) {
      this.currentPositionIndex += 1;

      this.updateView();
    }
  }

  public previous(): void {
    if ((this.currentPositionIndex - 1) !== -1) {
      this.currentPositionIndex -= 1;

      this.updateView();
    }
  }

  public getTotalItems(): number {
    return this.configuration.getTotalItems();
  }

  getSizeOfItem(): number {
    return this.configuration.scrollValue.getValue() /
      this.configuration.getPageSize();
  }

  public getCurrentPositionIndex(): number {
    return this.currentPositionIndex;
  }

  public getTotalNumberOfPositions(): number {
    return this.positions.length;
  }

  private addSubscribers(): void {
    this.configuration.scrollValue.subscribe(() => {
      this.updateState();
    });

    this.configuration.pageSize.subscribe(() => {
      this.updateState();
    });
  }

  private updateState(): void {
    this.currentPositionIndex = 0;
    this.setScrollPositions();
    this.prepareCarouselContentElement();
  }

  private prepareCarouselContentElement(): void {
    this.carouselContentElement.style.transform = 'translateX(0px)';
    this.carouselContentElement.style.transition =
      'transform .45s cubic-bezier(0.6, 0.04, 0.68, 0.335),'
      + 'max-height .45s ease-in-out';
  }

  private setScrollPositions(): void {
    this.positions = this.createScrollPositions();
  }

  private createScrollPositions(): Array<number> {
    let i;
    let previousPositionValue: number = 0;
    let currentScrollPosition = this.configuration.scrollValue.getValue();
    let positions: Array<number> = [previousPositionValue];

    this.totalPositions = this.getNumberOfPositions();

    for (i = 0; i < this.totalPositions; i++) {
      previousPositionValue = positions[positions.length - 1];
      positions.push(previousPositionValue - currentScrollPosition);
    }

    const lastPageItems = this.getTotalItems() % this.getPageSize();

    if (lastPageItems) {
      const lastItemsSize = lastPageItems * this.getSizeOfItem();
      positions.push(positions[i] - lastItemsSize);
    }

    return positions;
  }

  private getPageSize(): number {
    return this.configuration.getPageSize();
  }

  private updateView(): void {
    const pos = this.positions[this.currentPositionIndex];
    this.callbacks.forEach((callback) => callback(this.currentPositionIndex));

    this.carouselContentElement.style.transform = `translateX(${pos}px)`;
  }
}
