import { Component } from '@angular/core';
import ModalService from './modal.service';

@Component({
  selector: 'app-modal',
  styleUrls: ['/modal.component.scss'],
  templateUrl: './modal.component.html'
})

export default class ModalComponent {
  constructor(private modalService: ModalService) {
  }

  shouldShow() {
    return this.modalService.getState();
  }

  getConfigurationVO() {
    return this.modalService.getConfigurationVO();
  }
}
