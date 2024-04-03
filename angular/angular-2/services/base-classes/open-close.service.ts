import {CLOSED, OPEN} from '../../support/constants';
import {Subject} from 'rxjs/Subject';

export default class OpenCloseService {
  public status = new Subject<string>();
  private configurationVO: Object;
  private _status: string = CLOSED;

  open(baseViewContext) {
    this.configurationVO = baseViewContext;
    this._status = OPEN;
    this.status.next(OPEN);
  }

  close() {
    this.configurationVO = null;
    this._status = CLOSED;
    this.status.next(CLOSED);
  }

  public getStatus(): string {
    return this._status;
  }

  public getConfigurationVO(): any {
    return this.configurationVO;
  }
}
