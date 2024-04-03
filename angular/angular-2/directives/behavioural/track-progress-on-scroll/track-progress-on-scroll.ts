import {Directive, ElementRef, Input} from '@angular/core';
import WindowScrollService from '../../../services/window-scroll.service';

@Directive({
  selector: '[track-progress-on-scroll]',
})
export class TrackProgressOnScrollDirective {

  @Input() tracker: string;

  constructor(
    private el: ElementRef,
    private windowScrollService: WindowScrollService) {
    this.windowScrollService.scroll(20).subscribe((event) => this.onScroll());
  }

  ngOnInit() {
    this.trackProgress();
  }

  onScroll() {
    this.trackProgress();
  }

  trackProgress() {

    let TOP_OFF_SET = 230;
    let rect = this.el.nativeElement.getBoundingClientRect();
    let progressPixels = rect.height -
      Math.min(Math.max(rect.bottom - TOP_OFF_SET, 0), rect.height);
    let progressPercentage = progressPixels * 100 / rect.height;

    //TODO: refactor
    let tracker = document.getElementById(this.tracker);
    let trackerProgress = document.getElementById(this.tracker + '-progress');

    if (trackerProgress) {
      trackerProgress.style.width = progressPercentage + '%';
    }

    if (tracker && progressPercentage > 0) {
      tracker.classList.add('--visible');
    } else if (tracker) {
      tracker.classList.remove('--visible');
    }

    if (rect.top > 210 && rect.top < 250) {
      tracker.classList.add('--top');
    } else {
      tracker.classList.remove('--top');
    }
  }
}
