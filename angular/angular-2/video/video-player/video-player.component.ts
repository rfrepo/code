/* tslint:disable:max-line-length */
import {generateUUID} from '../../../utilities';
import WindowService from '../../../services/window.service';
import {IDimensions} from '../../../types/idimensions';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer,
} from '@angular/core';
import {VideoPlayerService} from '../../../services/video-player/video-player.service';
/* tslint:enable:max-line-length */

@Component({
  selector: 'app-video-player',
  template: `
    <div id="{{playerInstanceId}}"></div>`,
})

export default class VideoPlayerComponent implements AfterViewInit, OnDestroy {
  @Input()
  public title: string;

  @Input()
  public video_url: string; // tslint:disable-line variable-name

  @Input()
  public playerInstanceId: string = generateUUID();
  @Output()
  private playerReady = new EventEmitter<string>();
  @Output()
  private playerStateChange = new EventEmitter<string>();
  private player: any;
  private _window: Window; // tslint:disable-line variable-name
  private videoPlayerService: VideoPlayerService;

  /**
   * @fileoverview A component class that represents the video player
   */
  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    windowService: WindowService,
    videoPlayerService: VideoPlayerService) {

    this._window = windowService.nativeWindow;
    this.videoPlayerService = videoPlayerService;
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  private _dimensions: IDimensions;

  get dimensions(): IDimensions {
    return this._dimensions;
  }

  @Input()
  set dimensions(dimensions: IDimensions) {
    this._dimensions = dimensions;
    this.updatePlayerDimensions();
  }

  /**
   * Triggers the creation of the video player after the view components have
   * been rendered
   */
  ngAfterViewInit(): void {
    this.createPlayer();
  }

  /**
   * Orchestrates the creation of a video player instance
   */
  createPlayer(): void {
    const {
      onPlayerReady,
      onPlayerStateChange,
      playerInstanceId,
      video_url,
      dimensions,
    } = this;

    let videoId;
    if (video_url.match(/(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/)) {
      // Fixing js console errors - not sure why this isn't matching
      videoId =
        video_url.match(/(^|=|\/)([0-9A-Za-z_-]{11})(\/|&|$|\?|#)/)[2];
    } else {
      return;
    }

    const {width, height}: IDimensions = dimensions;

    this.player =
      this.videoPlayerService.createPlayerInstance({
        width,
        height,
        videoId,
        playerInstanceId,
      });

    this.player.getReadyChangeEmitter().subscribe(onPlayerReady);
    this.player.getStateChangeEmitter().subscribe(onPlayerStateChange);
  }

  /**
   * Handler function that emits the player ready event
   */
  onPlayerReady(): void {
    this.playerReady.emit();
    this.updatePlayerDimensions();
  }

  /**
   * Triggers video playout
   */
  playVideo(): void {
    this.player.playVideo();
  }

  /**
   * stops video playback
   */
  ngOnDestroy(): void {
    this.player.destroy();
  }

  /**
   * Handler function tha emits the player state change event
   * @param {Object} event
   */
  onPlayerStateChange(event: any): void {
    this.playerStateChange.emit(event);
  }

  /**
   * Sets the dimension of the video player instance
   */
  updatePlayerDimensions(): void {
    if (this.player) {
      const {width, height}: IDimensions = this.dimensions;

      this.player.setSize(width, height);

      this.renderer.setElementStyle(this.el.nativeElement,
        'width',
        `${width}px`);
      this.renderer.setElementStyle(this.el.nativeElement,
        'height',
        `${height}px`);
    }
  }
}
