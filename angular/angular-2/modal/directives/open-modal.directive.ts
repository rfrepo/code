import ModalService from '../modal.service';
import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOpenModal]'
})
export default class OpenModalDirective {
  @Input()
  appOpenModal;

  constructor(private modalService: ModalService) {
  }

  @HostListener('click')
  openModal() {
    const { modalService, appOpenModal: modelConfiguration }: any = this;
    modalService.open(modelConfiguration);
  }
}
