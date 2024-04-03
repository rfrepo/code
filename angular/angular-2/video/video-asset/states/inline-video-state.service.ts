import {IVideoState} from './IVideoState';
import VideoAssetComponent from '../video-asset.component';

/**
 * @fileoverview A class that handles the video asset component's logic for
 * handling inline video behaviour
 */
export default class InlineVideoState implements IVideoState {
  private videoAssetComponent: VideoAssetComponent;

  /**
   * Sets the videoAssetComponent
   * @param {Object}videoAssetComponent
   */
  setVideoAssetComponent(videoAssetComponent: VideoAssetComponent): void {
    this.videoAssetComponent = videoAssetComponent;
    this.applyState();
  }

  /**
   * Sets up the videoAssetComponent ui for playing video inline
   */
  applyState(): void {
    this.videoAssetComponent.showVideoPoster();
    this.videoAssetComponent.showVideoPlayer();
    this.videoAssetComponent.hideVideoPosterPlayButton();
  }

  /**
   * Shows the video poster play button when the video is ready to be played
   */
  playerReady(): void {
    this.videoAssetComponent.showVideoPosterPlayButton();
  }

  /**
   * Retrieves the player instance, plays the video content and hide the poster
   */
  playOut(): void {
    this.videoAssetComponent.getVideoPlayer().playVideo();
    this.videoAssetComponent.hideVideoPoster();
  }


  /**
   * Handles the video player state changes
   * A value of 0 signifies the end of the video which is handled by resetting
   * the ui and showing the play button and poster
   * @param {number} playerCurrentState - player current state
   */
  videoStateChange({data: playerCurrentState}: { data: number }) {
    if (playerCurrentState === 0) {
      this.videoAssetComponent.showVideoPoster();
      this.videoAssetComponent.showVideoPosterPlayButton();
    }
  }
}

/**
 * Factory provider for Dependency Injection for this class
 * @type {{provide: InlineVideoState; useFactory: (()=>InlineVideoState)}}
 */
export const InlineVideoStateProvider = { // tslint:disable-line variable-name
  provide: InlineVideoState,
  useFactory: () => new InlineVideoState(),
};
