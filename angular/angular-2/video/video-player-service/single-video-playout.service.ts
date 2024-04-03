import {Injectable} from '@angular/core';
import {VideoPlayerInstanceProxy} from './video-player-instance-proxy';
import {VideoPlayerService} from './video-player.service';

@Injectable()
export class SingleVideoPlayoutEnforcementService {
  private observableMap: Object = {};

  constructor(private videoPlayerService: VideoPlayerService) {
    this.bindMethods();

    this.subscribeToVideoPlayerProxyCreation();
  }

  bindMethods() {
    this.playerInstanceOnStateChange =
      this.playerInstanceOnStateChange.bind(this);

    this.subscribeToVideoProxyEventChanges =
      this.subscribeToVideoProxyEventChanges.bind(this);

    this.removeVideoPlayerProxySubscriptions =
      this.removeVideoPlayerProxySubscriptions.bind(this);
  }

  subscribeToVideoPlayerProxyCreation(): void {
    this.videoPlayerService.getPlayerInstanceCreatedEmitter()
      .subscribe(this.subscribeToVideoProxyEventChanges);
  }

  subscribeToVideoProxyEventChanges(
    videoPlayerInstanceProxy: VideoPlayerInstanceProxy): void {
    let subscriptions = this.observableMap[videoPlayerInstanceProxy.getId()] =
      [];

    subscriptions.push(videoPlayerInstanceProxy.getStateChangeEmitter()
      .subscribe(this.playerInstanceOnStateChange));

    subscriptions.push(videoPlayerInstanceProxy.getDestroyedEmitter()
      .subscribe(this.removeVideoPlayerProxySubscriptions));
  }

  /**
   * -1 (unstarted)
   *  0 (ended)
   *  1 (playing)
   *  2 (paused)
   *  3 (buffering)
   *  5 (video cued)
   */
  playerInstanceOnStateChange({data, target}): void {
    if (data === 1) {
      this.ensureSingleVideoIsPlaying(target);
    }
  }

  ensureSingleVideoIsPlaying(target): void {
    const playerIdInitiatingPlay = target.a.id;

    this.videoPlayerService.getPlayerInstanceVOs()
      .forEach((videoPlayerInstanceProxy: VideoPlayerInstanceProxy) => {
        const state: number = videoPlayerInstanceProxy.getPlayerState();

        const playerInstanceId: string = videoPlayerInstanceProxy.getId();

        if (playerIdInitiatingPlay !== playerInstanceId && state === 1) {
          videoPlayerInstanceProxy.pauseVideo();
        }
      });
  }

  private removeVideoPlayerProxySubscriptions(
    videoPlayerInstanceProxy: VideoPlayerInstanceProxy): void {
    const subscriptions = this.observableMap[videoPlayerInstanceProxy.getId()];

    for (const subscription of subscriptions) {
      subscription.unsubscribe();
    }

    this.observableMap[videoPlayerInstanceProxy.getId()] = [];
  }
}
