import {EventEmitter} from '@angular/core';

export class VideoPlayerInstanceProxy {
  private config: any;
  private progressInterval: any;
  private instance: any = {isNullObject: true, setSize: Function.prototype};
  private readyChangeEmitter: EventEmitter<number> = new EventEmitter<number>();
  private stateChangeEmitter: EventEmitter<number> = new EventEmitter<number>();
  private progressEmitter: EventEmitter<number> = new EventEmitter<number>();
  private destroyedEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(config) {
    this.config = config;

    this.bindMethods();
  }

  bindMethods(): void {
    this.emitReady = this.emitReady.bind(this);
    this.updateProgress = this.updateProgress.bind(this);
    this.emitStateChange = this.emitStateChange.bind(this);
    this.determineProgressUpdates = this.determineProgressUpdates.bind(this);
  }

  emitReady(event): void {
    this.readyChangeEmitter.emit(event);
  }

  emitStateChange(event): void {
    this.determineProgressUpdates(event);
    this.stateChangeEmitter.emit(event);
  }

  determineProgressUpdates({data: state}) {
    if (state === 1) {
      this.progressInterval = setInterval(this.updateProgress, 500);
    } else {
      clearInterval(this.progressInterval);
      this.updateProgress();
    }
  }

  updateProgress() {
    const percentageProgress = this.instance.getCurrentTime() /
      this.instance.getDuration() *
      100;

    this.progressEmitter.emit(Math.round(percentageProgress));
  }

  playVideo(): void {
    this.instance.playVideo();
  }

  destroy() {
    clearInterval(this.progressInterval);
    this.destroyedEmitter.emit(this);
  }

  pauseVideo() {
    this.instance.pauseVideo();
  }

  getInstance(): any {
    return this.instance;
  }

  getId(): string {
    return this.config.playerInstanceId;
  }

  getDestroyedEmitter(): EventEmitter<any> {
    return this.destroyedEmitter;
  }

  getStateChangeEmitter(): EventEmitter<number> {
    return this.stateChangeEmitter;
  }

  getProgressEmitter(): EventEmitter<number> {
    return this.progressEmitter;
  }

  getReadyChangeEmitter(): EventEmitter<any> {
    return this.readyChangeEmitter;
  }

  getPlayerState(): number {
    return this.instance.getPlayerState();
  }

  setSize(width: number, height: number): void {
    this.instance.setSize(width, height);
  }

  setInstance(instance): void {
    this.instance = instance;
  }
}
