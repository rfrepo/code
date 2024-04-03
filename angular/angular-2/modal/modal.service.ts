import { Injectable } from '@angular/core';

@Injectable()
export default class ModalService {
  private configurationVO: Object;

  private isOpen: boolean = false;

  open(baseViewContext) {
    this.isOpen = true;
    this.configurationVO = baseViewContext;
  }

  close() {
    this.isOpen = false;
  }

  getState() {
    return this.isOpen;
  }

  getConfigurationVO() {
    return this.configurationVO;
  }
}
