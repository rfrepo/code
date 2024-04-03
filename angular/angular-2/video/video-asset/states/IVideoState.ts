import VideoAssetComponent from '../video-asset.component';

/**
 * @fileoverview An interface to be implemented by video assets state instances
 */
export interface IVideoState {
  playOut(): void;

  applyState(): void;

  playerReady(): void;

  setVideoAssetComponent(component: VideoAssetComponent): void;

  videoStateChange(event: any): void;
}
