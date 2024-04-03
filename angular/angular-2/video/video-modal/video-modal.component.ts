import {Component} from '@angular/core';
import ModalService from '../../modal/modal.service';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
})
export default class VideoModalComponent {
  /**
   * @fileoverview A component class for the modal video player
   */
  constructor(private modalService: ModalService) {
  }

  /**
   * Handles the player state changes
   * A value of 0 signifies the end of the video which is handled by closing the modal
   * @param {number} playerCurrentState (data) - video player state
   */
  handlePlayerStateChange({data: playerCurrentState}: { data: number }): void {
    if (playerCurrentState === 0) {
      this.modalService.close();
    }
  }
}
