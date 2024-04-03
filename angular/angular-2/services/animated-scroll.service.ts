import {Injectable} from '@angular/core';

@Injectable()
export default class AnimatedScrollService {
  public smoothScroll(element: HTMLElement, end: number): void {
    const duration = 500;

    const clock: number = Date.now();

    const requestAnimationFrame = window.requestAnimationFrame || function(fn) {
      window.setTimeout(fn, 15);
    };
    const start: number = element.scrollTop;

    let step = () => {
      let elapsed = Date.now() - clock;

      element.scrollTop = this.position(start, end, elapsed, duration);

      if (elapsed > duration) {
      } else {
        requestAnimationFrame(step);
      }
    };

    step();
  }

  easeInOutCubic(t: number): number {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  private position(
    start: number,
    end: number,
    elapsed: number,
    duration: number): number {
    return elapsed > duration
      ? end
      : start + (end - start) * this.easeInOutCubic(elapsed / duration);
  }
}
