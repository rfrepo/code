import {BehaviorSubject} from 'rxjs';
import {ICarouselConfiguration} from './ICarouselConfiguration';

export class CarouselConfiguration {

  public pageSize: BehaviorSubject<any>;
  public scrollValue: BehaviorSubject<any>;

  constructor(private data: ICarouselConfiguration) {
    this.createObservables();
  }

  createObservables(): void {
    this.pageSize = new BehaviorSubject(this.data.pageSize);
    this.scrollValue = new BehaviorSubject(this.data.scrollValue);
  }

  getViewRef(): any {
    return this.data.viewRef;
  }

  setPageSize(value: number): void {
    this.data.pageSize = value;
    this.pageSize.next(value);
  }

  getPageSize(): number {
    return this.data.pageSize;
  }

  getTotalItems(): number {
    return this.data.totalItems;
  }

  getScrollValue(): number {
    return this.data.scrollValue;
  }

  setScrollValue(value: number): void {
    this.data.scrollValue = value;
    this.scrollValue.next(value);
  }
}
