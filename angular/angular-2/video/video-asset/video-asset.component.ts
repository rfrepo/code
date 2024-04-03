/* tslint:disable:max-line-length */
import {IVideoState} from './states/IVideoState';
import {IDimensions} from '../../../types/idimensions';
import WindowService from '../../../services/window.service';
import InlineVideoState, {InlineVideoStateProvider} from './states/inline-video-state.service';
import VideoPlayerComponent from '../video-player/video-player.component';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
/* tslint:enable:max-line-length */

@Component({
  selector: 'app-video-asset',
  templateUrl: 'video-asset.component.html',
  providers: [InlineVideoStateProvider],
})

export default class VideoAssetComponent implements AfterViewInit {
  static ASPECT_RATIO: number = (16 / 9);

  @Input()
  image_url: string; // tslint:disable-line variable-name

  @Input()
  video_url: string; // tslint:disable-line variable-name

  @Input()
  title: string;

  dimensions: IDimensions = {width: 0, height: 0};

  private screen: any;
  private window: Window;
  private state: IVideoState;
  private isPosterVisible: boolean;
  private isPlayerVisible: boolean;
  private domReference: HTMLElement;
  private isPlayButtonVisible: boolean;

  @ViewChild(VideoPlayerComponent)
  private videoPlayerComponent: VideoPlayerComponent;

  /**
   * @fileoverview A component class that wraps the video player and video
   * poster image components
   */
  constructor(
    element: ElementRef,
    windowService: WindowService,
    private inlineVideoState: InlineVideoState) {
    this.domReference = element.nativeElement;
    this.window = windowService.nativeWindow;
    this.screen = windowService.screen;
    this.setState();
  }

  setState(): void {
    this.state = this.inlineVideoState;
    this.state.setVideoAssetComponent(this);
  }

  /**
   * Resizes the component after all the components children have been created
   */
  ngAfterViewInit(): void {
    this.resize();
  }

  /**
   * Delegates the handling of playout to the current state
   */
  handlePlayerReady(): void {
    this.state.playerReady();
  }

  /**
   * Delegates the handling of playout to the current state
   */
  handlePlayOutRequest(): void {
    this.state.playOut();
  }

  /**
   * Hides the video poster
   */
  hideVideoPoster(): void {
    this.isPosterVisible = false;
  }

  /**
   * Shows the video poster
   */
  showVideoPoster(): void {
    this.isPosterVisible = true;
  }

  /**
   * Hides the video poster play button
   */
  hideVideoPosterPlayButton(): void {
    this.isPlayButtonVisible = false;
  }

  /**
   * Show the video poster play button
   */
  showVideoPosterPlayButton(): void {
    this.isPlayButtonVisible = true;
  }

  /**
   * Returns the video player component instance
   * @returns {VideoPlayerComponent}
   */
  getVideoPlayer(): VideoPlayerComponent {
    return this.videoPlayerComponent;
  }

  /**
   * Return the video play button visibility
   * @returns {boolean}
   */
  getIsPlayButtonVisible(): boolean {
    return this.isPlayButtonVisible;
  }

  /**
   * Hides the video player
   */
  hideVideoPlayer(): void {
    this.isPlayerVisible = false;
  }

  /**
   * Shows the video player
   */
  showVideoPlayer() {
    this.isPlayerVisible = true;
  }

  /**
   * Returns the poster visibility value
   * @returns {boolean}
   */
  getPosterVisibility() {
    return this.isPosterVisible;
  }

  /**
   * Returns the player visibility value
   * @returns {boolean}
   */
  getPlayerVisibility(): boolean {
    return this.isPlayerVisible;
  }

  /**
   * Delegates the video state change event to the current state
   * @param {Object} event - video player event
   */
  handlePlayerStateChange(event: any): void {
    this.state.videoStateChange(event);
  }

  /**
   * Calculates and stores the height and width when the browser window resizes
   */
  @HostListener('window:resize')
  resize(): void {
    const {domReference, window}: any = this;
    let {paddingLeft, paddingRight, width}: any =
      window.getComputedStyle(domReference.parentElement, null);
    const combinedPadding =
      parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);

    width = parseInt(width, 10) - combinedPadding;
    const height = Math.floor(width / VideoAssetComponent.ASPECT_RATIO);

    this.dimensions = {width, height};
  }
}
