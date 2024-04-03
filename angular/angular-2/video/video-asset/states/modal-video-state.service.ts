import {IVideoState} from './IVideoState';
import ModalService from '../../../modal/modal.service';
import VideoAssetComponent from '../video-asset.component';
import {IDimensions} from '../../../../types/idimensions';
import VideoModalComponent from '../../video-modal/video-modal.component';
import {ContainerDimensionsService} from '../../../ruler/container-dimensions.service';

export default class ModalVideoState implements IVideoState {
  private videoAssetComponent: VideoAssetComponent;

  /**
   * @fileoverview A class that handles the video asset component's logic for handling modal video behaviour
   */
  constructor(
    private modalService: ModalService,
    private containerDimensionsService: ContainerDimensionsService) {
  }

  /**
   * Sets the videoAssetComponent
   * @param {Object} videoAssetComponent
   */
  setVideoAssetComponent(videoAssetComponent: VideoAssetComponent): void {
    this.videoAssetComponent = videoAssetComponent;
    this.applyState();
  }

  /**
   * Sets up the videoAssetComponent ui for playing videos in a modal
   */
  applyState(): void {
    this.videoAssetComponent.hideVideoPlayer();
    this.videoAssetComponent.showVideoPoster();
    this.videoAssetComponent.showVideoPosterPlayButton();
  }

  /**
   * Configures the modal service to initialise playing video in the modal
   */
  playOut(): void {
    const content = {
      videoId: this.videoAssetComponent.video_url,
      title: this.videoAssetComponent.title,
    };
    const dimensions = this.calculateDimensions();

    this.modalService.open({
      componentClass: VideoModalComponent,
      componentData: {content, dimensions},
    });
  }

  /**
   * Handles the video player state changes
   * A value of 0 signifies the end of the video which is handled by closing the modal
   * @param {number} playerCurrentState - player current state
   */
  videoStateChange({data: playerCurrentState}: { data: number }): void {
    if (playerCurrentState === 0) {
      this.modalService.close();
    }
  }

  /**
   * Stub method not implemented by this class
   */
  playerReady(): void {
  }

  /**
   * Retrieves the dimensions from the container dimension service and use them to sets video player height and width
   * @returns {{width:number, height: number}}
   */
  private calculateDimensions(): IDimensions {
    const {width}: { width: number } = this.containerDimensionsService.getDimensions();
    const height = Math.floor(width / VideoAssetComponent.ASPECT_RATIO);

    return {width, height};
  }
}

/**
 * Factory provider for Dependency Injection for this class
 * @type {{provide: ModalVideoState,
 * deps: [ModalService,ContainerDimensionsService],
 * useFactory:((modalService:ModalService, containerDimensionsService:ContainerDimensionsService)=>ModalVideoState)}}
 */
export const ModalVideoStateProvider = {
  provide: ModalVideoState,
  deps: [ModalService, ContainerDimensionsService],
  useFactory: (
    modalService: ModalService,
    containerDimensionsService: ContainerDimensionsService) => {
    return new ModalVideoState(modalService, containerDimensionsService);
  },
};

