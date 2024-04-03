import {IPageData} from '../../../types/ipage-data';
import {IDimensions} from '../../../types/idimensions';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-video-poster',
  templateUrl: 'video-poster.component.html',
})

/**
 * @fileoverview A component class for the video poster
 */
export default class VideoPosterComponent {
  @Input()
  content: IPageData;

  @Input()
  image_url: string; // tslint:disable-line variable-name

  @Input()
  title: string;

  @Input()
  dimensions: IDimensions;

  @Input()
  showMeta: boolean;

  @Input()
  isPlayButtonVisible: boolean;

  @Output()
  playOutRequested = new EventEmitter<string>();

  /**
   * Click event handler that emits the playout requested event
   * @param event
   */
  requestPlayOut(event: Event) {

    this.playOutRequested.emit();
    event.stopImmediatePropagation();
    event.stopPropagation();
    return false;
  }
}
