import ModalService from '../modal.service';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appCloseModal]'
})
export default class CloseModalDirective {

  constructor(private modalService: ModalService) {
  }

  @HostListener('click')
  openModal() {
    this.modalService.close();
  }
}
